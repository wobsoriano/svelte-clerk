import { type Handle } from '@sveltejs/kit';
import { clerkClient } from './clerkClient.js';
import * as constants from './constants.js';
import {
	AuthStatus,
	createClerkRequest,
	type AuthenticateRequestOptions
} from '@clerk/backend/internal';

export type ClerkSvelteKitMiddlewareOptions = AuthenticateRequestOptions & { debug?: boolean };

export default function withClerkHandler(middlewareOptions?: ClerkSvelteKitMiddlewareOptions) {
	return (async ({ event, resolve }) => {
		const { debug = false, ...options } = middlewareOptions ?? {};

		const clerkWebRequest = createClerkRequest(event.request);
		if (debug) {
			console.log('[Clerk SvelteKit] ' + JSON.stringify(clerkWebRequest.toJSON()));
		}

		const requestState = await clerkClient.authenticateRequest(clerkWebRequest, {
			...options,
			secretKey: options?.secretKey ?? constants.SECRET_KEY,
			publishableKey: options?.publishableKey ?? constants.PUBLISHABLE_KEY
		});

		const locationHeader = requestState.headers.get(constants.Headers.Location);
		if (locationHeader) {
			if (debug) {
				console.log('[Clerk SvelteKit] Handshake redirect triggered');
			}
			return new Response(null, { status: 307, headers: requestState.headers });
		}

		if (requestState.status === AuthStatus.Handshake) {
			throw new Error('[Clerk SvelteKit] Handshake status without redirect');
		}

		const authObject = requestState.toAuth();
		event.locals.auth = authObject;
		if (debug) {
			console.log('[Clerk SvelteKit] ' + JSON.stringify(authObject));
		}

		if (requestState.headers) {
			event.setHeaders(Object.fromEntries(requestState.headers));
		}

		return resolve(event, {
			transformPageChunk({ html }) {
				/**
				 * Hijack the response and inject the auth object into the page
				 */
				const scriptContent = `<script>window.__CLERK_SK_AUTH__ = ${JSON.stringify(authObject)}</script>`;
				return insertScriptBeforeHeadEnd(html, scriptContent);
			}
		});
	}) satisfies Handle;
}

function insertScriptBeforeHeadEnd(htmlString: string, scriptContent: string) {
	const headEndIndex = htmlString.toLowerCase().indexOf('</head>');

	return htmlString.slice(0, headEndIndex) + scriptContent + htmlString.slice(headEndIndex);
}
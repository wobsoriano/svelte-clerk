import { type Handle } from '@sveltejs/kit';
import { clerkClient } from './clerkClient.js';
import * as constants from './constants.js';
import {
	AuthStatus,
	createClerkRequest,
	type AuthenticateRequestOptions
} from '@clerk/backend/internal';
import { parse } from 'set-cookie-parser';
import { createCurrentUser } from './currentUser.js';

export type ClerkSvelteKitMiddlewareOptions = AuthenticateRequestOptions & { debug?: boolean };

export function withClerkHandler(middlewareOptions?: ClerkSvelteKitMiddlewareOptions): Handle {
	return async ({ event, resolve }) => {
		const { debug = false, ...options } = middlewareOptions ?? {};

		const clerkWebRequest = createClerkRequest(event.request);
		if (debug) {
			console.log('[svelte-clerk] ' + JSON.stringify(clerkWebRequest.toJSON()));
		}

		const requestState = await clerkClient.authenticateRequest(clerkWebRequest, {
			...options,
			secretKey: options?.secretKey ?? constants.SECRET_KEY,
			publishableKey: options?.publishableKey ?? constants.PUBLISHABLE_KEY
		});

		const locationHeader = requestState.headers.get(constants.Headers.Location);
		if (locationHeader) {
			if (debug) {
				console.log('[svelte-clerk] Handshake redirect triggered');
			}
			return new Response(null, { status: 307, headers: requestState.headers });
		}

		if (requestState.status === AuthStatus.Handshake) {
			throw new Error('[svelte-clerk] Handshake status without redirect');
		}

		const authObject = requestState.toAuth();
		event.locals.auth = authObject;
		event.locals.currentUser = createCurrentUser(authObject);
		if (debug) {
			console.log('[svelte-clerk] ' + JSON.stringify(authObject));
		}

		type CookieSerializerOptions = Parameters<typeof event.cookies.set>[2];

		if (requestState.headers) {
			const setCookie = requestState.headers.get('set-cookie');
			// We separate cookie setting logic because SvelteKit
			// does not allow setting cookies with setHeaders.
			if (setCookie) {
				const parsedCookies = parse(setCookie);
				parsedCookies.forEach((parsedCookie) => {
					const { name, value, ...options } = parsedCookie;
					event.cookies.set(name, value, options as CookieSerializerOptions & { path: string });
				});
				requestState.headers.delete('set-cookie');
			}
			event.setHeaders(Object.fromEntries(requestState.headers));
		}

		return resolve(event);
	};
}

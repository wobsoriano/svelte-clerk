import { type Handle, type RequestEvent } from '@sveltejs/kit';
import { clerkClient } from './clerkClient.js';
import * as constants from './constants.js';
import {
	AuthStatus,
	createClerkRequest,
	type AuthenticateRequestOptions,
	type RequestState
} from '@clerk/backend/internal';
import { parse } from 'set-cookie-parser';
import { createCurrentUser } from './currentUser.js';
import type { AuthObject } from '@clerk/backend';
import { deprecated } from '@clerk/shared/deprecated';
import { isDevelopmentFromPublishableKey } from '@clerk/shared';
import { NETLIFY_CACHE_BUST_PARAM } from '$lib/utils/netlifyCacheBust.js';

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
			handleNetlifyCacheInDevInstance(locationHeader, requestState);
			return new Response(null, { status: 307, headers: requestState.headers });
		}

		if (requestState.status === AuthStatus.Handshake) {
			throw new Error('[svelte-clerk] Handshake status without redirect');
		}

		const authObject = requestState.toAuth();
		decorateLocals(event, authObject);

		if (debug) {
			console.log('[svelte-clerk] ' + JSON.stringify(authObject));
		}

		decorateHeaders(event, requestState.headers);

		return resolve(event);
	};
}

function decorateHeaders(event: RequestEvent, headers: Headers) {
	type CookieSerializerOptions = Parameters<typeof event.cookies.set>[2];

	const setCookie = headers.get('set-cookie');
	// We separate cookie setting logic because SvelteKit
	// does not allow setting cookies with setHeaders.
	if (setCookie) {
		const parsedCookies = parse(setCookie);
		parsedCookies.forEach((parsedCookie) => {
			const { name, value, ...options } = parsedCookie;
			event.cookies.set(name, value, options as CookieSerializerOptions & { path: string });
		});
		headers.delete('set-cookie');
	}
	event.setHeaders(Object.fromEntries(headers));
}

function decorateLocals(event: RequestEvent, authObject: AuthObject) {
	const authHandler = () => authObject;

	const auth = new Proxy(Object.assign(authHandler, authObject), {
		get(target, prop: string, receiver) {
			deprecated('event.locals.auth', 'Use `event.locals.auth()` as a function instead.');

			return Reflect.get(target, prop, receiver);
		}
	});

	event.locals.auth = auth;
	event.locals.currentUser = createCurrentUser(auth());
}

/**
 * Prevents infinite redirects in Netlify's functions
 * by adding a cache bust parameter to the original redirect URL. This ensures Netlify
 * doesn't serve a cached response during the authentication flow.
 */
function handleNetlifyCacheInDevInstance(locationHeader: string, requestState: RequestState) {
	// Only run on Netlify environment and Clerk development instance
	if (process.env.NETLIFY && isDevelopmentFromPublishableKey(requestState.publishableKey)) {
		const hasHandshakeQueryParam = locationHeader.includes('__clerk_handshake');
		// If location header is the original URL before the handshake redirects, add cache bust param
		if (!hasHandshakeQueryParam) {
			const url = new URL(locationHeader);
			url.searchParams.append(NETLIFY_CACHE_BUST_PARAM, Date.now().toString());
			requestState.headers.set('Location', url.toString());
		}
	}
}

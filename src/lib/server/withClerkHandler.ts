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
import { handleNetlifyCacheInDevInstance } from '@clerk/shared/netlifyCacheHandler';

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
			handleNetlifyCacheInDevInstance({
				locationHeader,
				publishableKey: requestState.publishableKey,
				requestStateHeaders: requestState.headers
			});
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

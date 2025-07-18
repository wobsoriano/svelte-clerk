import { type Handle, type RequestEvent } from '@sveltejs/kit';
import { clerkClient } from './clerkClient.js';
import * as constants from './constants.js';
import {
	AuthStatus,
	createClerkRequest,
	TokenType,
	type AuthenticateRequestOptions
} from '@clerk/backend/internal';
import { parse, splitCookiesString } from 'set-cookie-parser';
import type { ClerkRequest } from '@clerk/backend/internal';
import { handleNetlifyCacheInDevInstance } from '@clerk/shared/netlifyCacheHandler';
import type { PendingSessionOptions } from '@clerk/types';
import { handleValueOrFn } from '@clerk/shared/utils';
import { isHttpOrHttps } from '@clerk/shared/proxy';
import { isDevelopmentFromSecretKey } from '@clerk/shared/keys';
import { getDynamicPublicEnvVariables } from '$lib/utils/getDynamicPublicEnvVariables.js';
import { isTruthy } from '@clerk/shared/underscore';
import type { SessionAuthObject } from '@clerk/backend';

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
			publishableKey: options?.publishableKey ?? constants.PUBLISHABLE_KEY,
			...handleMultiDomainAndProxy(clerkWebRequest, options),
			acceptsToken: TokenType.SessionToken
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

		const auth = (options?: PendingSessionOptions) => requestState.toAuth(options);
		decorateLocals(event, auth);

		if (debug) {
			console.log('[svelte-clerk] ' + JSON.stringify(auth()));
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
		const splitCookies = splitCookiesString(setCookie);
		const parsedCookies = parse(splitCookies);
		parsedCookies.forEach((parsedCookie) => {
			const { name, value, ...options } = parsedCookie;
			event.cookies.set(name, value, options as CookieSerializerOptions & { path: string });
		});
		headers.delete('set-cookie');
	}
	event.setHeaders(Object.fromEntries(headers));
}

function decorateLocals(
	event: RequestEvent,
	auth: (options?: PendingSessionOptions) => SessionAuthObject
) {
	event.locals.auth = auth;
}

function handleMultiDomainAndProxy(clerkRequest: ClerkRequest, opts: AuthenticateRequestOptions) {
	const relativeOrAbsoluteProxyUrl = handleValueOrFn(
		opts?.proxyUrl,
		clerkRequest.clerkUrl,
		getDynamicPublicEnvVariables().proxyUrl
	);

	let proxyUrl;
	if (!!relativeOrAbsoluteProxyUrl && !isHttpOrHttps(relativeOrAbsoluteProxyUrl)) {
		proxyUrl = new URL(relativeOrAbsoluteProxyUrl, clerkRequest.clerkUrl).toString();
	} else {
		proxyUrl = relativeOrAbsoluteProxyUrl;
	}

	const isSatellite = handleValueOrFn(
		opts.isSatellite,
		new URL(clerkRequest.url),
		isTruthy(getDynamicPublicEnvVariables().isSatellite) || false
	);
	const domain = handleValueOrFn(
		opts.domain,
		new URL(clerkRequest.url),
		getDynamicPublicEnvVariables().domain
	);
	const signInUrl = opts?.signInUrl || getDynamicPublicEnvVariables().signInUrl;

	if (isSatellite && !proxyUrl && !domain) {
		throw new Error(missingDomainAndProxy);
	}

	if (
		isSatellite &&
		!isHttpOrHttps(signInUrl) &&
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		isDevelopmentFromSecretKey(opts.secretKey || constants.SECRET_KEY!)
	) {
		throw new Error(missingSignInUrlInDev);
	}

	return {
		proxyUrl,
		isSatellite,
		domain
	};
}

export const missingDomainAndProxy = `
Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl.

1) With middleware
   e.g. export default clerkMiddleware({domain:'YOUR_DOMAIN',isSatellite:true});
2) With environment variables e.g.
   PUBLIC_CLERK_DOMAIN='YOUR_DOMAIN'
   PUBLIC_CLERK_IS_SATELLITE='true'
   `;

export const missingSignInUrlInDev = `
Invalid signInUrl. A satellite application requires a signInUrl for development instances.
Check if signInUrl is missing from your configuration or if it is not an absolute URL

1) With middleware
   e.g. export default clerkMiddleware({signInUrl:'SOME_URL', isSatellite:true});
2) With environment variables e.g.
   PUBLIC_CLERK_SIGN_IN_URL='SOME_URL'
   PUBLIC_CLERK_IS_SATELLITE='true'`;

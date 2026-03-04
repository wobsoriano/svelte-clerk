import { type Handle, type RequestEvent } from '@sveltejs/kit';
import { clerkClient } from './clerkClient.js';
import {
	AuthStatus,
	createClerkRequest,
	TokenType,
	type AuthenticateRequestOptions,
	constants
} from '@clerk/backend/internal';
import { parse, splitCookiesString } from 'set-cookie-parser';
import type { ClerkRequest } from '@clerk/backend/internal';
import { handleNetlifyCacheInDevInstance } from '@clerk/shared/netlifyCacheHandler';
import type { PendingSessionOptions } from '@clerk/shared/types';
import { handleValueOrFn } from '@clerk/shared/utils';
import { isHttpOrHttps } from '@clerk/shared/proxy';
import { isDevelopmentFromSecretKey } from '@clerk/shared/keys';
import type { SessionAuthObject } from '@clerk/backend';
import { patchRequest } from './patchRequest.js';

import type { ClerkSvelteKitMiddlewareOptions } from './types.js';

export type { ClerkSvelteKitMiddlewareOptions };

const loadEnv = () => {
	const env: Record<string, string | undefined> = {};
	if (typeof process !== 'undefined' && process.env) {
		env.CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
		env.PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.PUBLIC_CLERK_PUBLISHABLE_KEY;
		env.PUBLIC_CLERK_SIGN_IN_URL = process.env.PUBLIC_CLERK_SIGN_IN_URL;
		env.PUBLIC_CLERK_SIGN_UP_URL = process.env.PUBLIC_CLERK_SIGN_UP_URL;
		env.PUBLIC_CLERK_PROXY_URL = process.env.PUBLIC_CLERK_PROXY_URL;
		env.PUBLIC_CLERK_DOMAIN = process.env.PUBLIC_CLERK_DOMAIN;
		env.PUBLIC_CLERK_IS_SATELLITE = process.env.PUBLIC_CLERK_IS_SATELLITE;
		env.PUBLIC_CLERK_TELEMETRY_DISABLED = process.env.PUBLIC_CLERK_TELEMETRY_DISABLED;
		env.PUBLIC_CLERK_TELEMETRY_DEBUG = process.env.PUBLIC_CLERK_TELEMETRY_DEBUG;
	}
	return env;
};

export function withClerkHandler(middlewareOptions?: ClerkSvelteKitMiddlewareOptions): Handle {
	return async ({ event, resolve }) => {
		const env = loadEnv();
		const {
			debug = false,
			telemetry,
			...options
		} = {
			secretKey: env.CLERK_SECRET_KEY,
			publishableKey: env.PUBLIC_CLERK_PUBLISHABLE_KEY,
			signInUrl: env.PUBLIC_CLERK_SIGN_IN_URL,
			signUpUrl: env.PUBLIC_CLERK_SIGN_UP_URL,
			proxyUrl: env.PUBLIC_CLERK_PROXY_URL,
			domain: env.PUBLIC_CLERK_DOMAIN,
			isSatellite: env.PUBLIC_CLERK_IS_SATELLITE === 'true',
			telemetry: {
				disabled: env.PUBLIC_CLERK_TELEMETRY_DISABLED === 'true',
				debug: env.PUBLIC_CLERK_TELEMETRY_DEBUG === 'true'
			},
			...middlewareOptions
		};

		// Store config in locals for clerkClient() to use
		event.locals.__internal_clerk_config = {
			...options,
			debug,
			telemetry
		};

		const clerkWebRequest = createClerkRequest(patchRequest(event.request));
		if (debug) {
			console.log('[svelte-clerk] ' + JSON.stringify(clerkWebRequest.toJSON()));
		}

		const requestState = await clerkClient(event).authenticateRequest(clerkWebRequest, {
			...options,
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

			// For session cookies (including prefixed ones like __session_{suffix}),
			// we need to preserve the original attributes and ensure HttpOnly is not added
			// if it wasn't in the original
			if (name === constants.Cookies.Session || name.startsWith(constants.Cookies.Session)) {
				// Convert parsed cookie options to SvelteKit format
				const cookieOptions: CookieSerializerOptions & { path: string } = {
					path: options.path || '/',
					expires: options.expires,
					maxAge: options.maxAge,
					domain: options.domain,
					secure: options.secure,
					httpOnly: options.httpOnly, // Use Clerk's original setting
					sameSite: options.sameSite as 'lax' | 'strict' | 'none' | undefined
				};

				// Explicitly override SvelteKit's default httpOnly: true
				// This allows Clerk's client-side SDK to access the session
				if (!options.httpOnly) {
					cookieOptions.httpOnly = false; // Explicitly set to false to override SvelteKit's default
				}

				event.cookies.set(name, value, cookieOptions);
			} else {
				// For other cookies, use the standard approach
				event.cookies.set(name, value, options as CookieSerializerOptions & { path: string });
			}
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
		clerkRequest.clerkUrl
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
		false
	);
	const domain = handleValueOrFn(
		opts.domain,
		new URL(clerkRequest.url)
	);
	const signInUrl = opts?.signInUrl;

	if (isSatellite && !proxyUrl && !domain) {
		throw new Error(missingDomainAndProxy);
	}

	if (
		isSatellite &&
		!isHttpOrHttps(signInUrl) &&
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		isDevelopmentFromSecretKey(opts.secretKey!)
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

1) With handler
   e.g. export const handle = withClerkHandler({domain:'YOUR_DOMAIN',isSatellite:true});
2) With environment variables e.g.
   PUBLIC_CLERK_DOMAIN='YOUR_DOMAIN'
   PUBLIC_CLERK_IS_SATELLITE='true'
   `;

export const missingSignInUrlInDev = `
Invalid signInUrl. A satellite application requires a signInUrl for development instances.
Check if signInUrl is missing from your configuration or if it is not an absolute URL

1) With handler
   e.g. export const handle = withClerkHandler({signInUrl:'SOME_URL', isSatellite:true});
2) With environment variables e.g.
   PUBLIC_CLERK_SIGN_IN_URL='SOME_URL'
   PUBLIC_CLERK_IS_SATELLITE='true'`;

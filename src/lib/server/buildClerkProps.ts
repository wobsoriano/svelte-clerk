import { makeAuthObjectSerializable, stripPrivateDataFromObject } from '@clerk/backend/internal';
import type { AuthObject } from '@clerk/backend';
import type { RequestEvent } from '@sveltejs/kit';
import type { ClerkPageData, ClerkSvelteKitMiddlewareOptions } from './types.js';

/**
 * To enable Clerk SSR support, include this object in the props returned from your
 * layout's `load` function. This makes auth state and public config available to
 * `ClerkProvider` during SSR, hydration, and CSR.
 *
 * @example
 * ```ts
 * // src/routes/+layout.server.ts
 * import { buildClerkProps } from 'svelte-clerk/server';
 *
 * export const load = ({ locals }) => {
 *   return {
 *     ...buildClerkProps(locals),
 *   };
 * };
 * ```
 */
export function buildClerkProps(
	localsOrEventOrAuth: App.Locals | RequestEvent | AuthObject,
): { __clerk: ClerkPageData } {
	let auth: AuthObject;
	let localsConfig: ClerkSvelteKitMiddlewareOptions = {};

	if ('locals' in localsOrEventOrAuth) {
		// RequestEvent
		auth = localsOrEventOrAuth.locals.auth();
		localsConfig = localsOrEventOrAuth.locals.__internal_clerk_config;
	} else if ('auth' in localsOrEventOrAuth && typeof localsOrEventOrAuth.auth === 'function') {
		// App.Locals
		auth = (localsOrEventOrAuth as App.Locals).auth();
		localsConfig = (localsOrEventOrAuth as App.Locals).__internal_clerk_config;
	} else {
		// AuthObject (no config available)
		auth = localsOrEventOrAuth as AuthObject;
	}

	const initialState = JSON.parse(
		JSON.stringify(makeAuthObjectSerializable(stripPrivateDataFromObject(auth))),
	);

	const __clerk: ClerkPageData = {
		initialState,
		publishableKey: localsConfig.publishableKey,
		signInUrl: localsConfig.signInUrl,
		signUpUrl: localsConfig.signUpUrl,
		proxyUrl: localsConfig.proxyUrl,
		domain: localsConfig.domain,
		isSatellite: localsConfig.isSatellite,
		telemetry: localsConfig.telemetry,
	};

	return { __clerk };
}

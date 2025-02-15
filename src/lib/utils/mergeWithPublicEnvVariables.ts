import type { LoadClerkJsScriptOptions } from '@clerk/shared';
import { getStaticPublicEnvVariables } from './getStaticPublicEnvVariables.js';

/**
 * Merges the public environment variables with the Clerk initialization options.
 *
 * This function takes a Clerk initialization options object and returns a new object
 * with the public environment variables merged into it. If a property is already
 * defined in the Clerk initialization options, it will not be overridden.
 */
export function mergeWithPublicEnvVariables(
	clerkInitOptions: Omit<LoadClerkJsScriptOptions, 'publishableKey'> & {
		publishableKey?: string;
	}
): Partial<LoadClerkJsScriptOptions> {
	const {
		publishableKey,
		signInUrl,
		signUpUrl,
		signInForceRedirectUrl,
		signUpForceRedirectUrl,
		signInFallbackRedirectUrl,
		signUpFallbackRedirectUrl,
		clerkJSUrl,
		clerkJSVersion,
		proxyUrl,
		domain,
		telemetry
	} = clerkInitOptions;
	return {
		publishableKey: publishableKey || getStaticPublicEnvVariables().publishableKey,
		signInUrl: signInUrl || getStaticPublicEnvVariables().signInUrl,
		signUpUrl: signUpUrl || getStaticPublicEnvVariables().signUpUrl,
		signInForceRedirectUrl:
			signInForceRedirectUrl || getStaticPublicEnvVariables().signInForceRedirectUrl,
		signUpForceRedirectUrl:
			signUpForceRedirectUrl || getStaticPublicEnvVariables().signUpForceRedirectUrl,
		signInFallbackRedirectUrl:
			signInFallbackRedirectUrl || getStaticPublicEnvVariables().signInFallbackRedirectUrl,
		signUpFallbackRedirectUrl:
			signUpFallbackRedirectUrl || getStaticPublicEnvVariables().signUpFallbackRedirectUrl,
		clerkJSUrl: clerkJSUrl || getStaticPublicEnvVariables().clerkJSUrl,
		clerkJSVersion: clerkJSVersion || getStaticPublicEnvVariables().clerkJSVersion,
		proxyUrl: proxyUrl || getStaticPublicEnvVariables().proxyUrl,
		domain: domain || getStaticPublicEnvVariables().domain,
		telemetry: telemetry || {
			debug: getStaticPublicEnvVariables().telemetryDebug,
			disabled: getStaticPublicEnvVariables().telemetryDisabled
		}
	};
}

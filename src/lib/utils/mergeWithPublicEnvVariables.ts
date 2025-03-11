import type { LoadClerkJsScriptOptions } from '@clerk/shared';
import { getDynamicPublicEnvVariables } from './getDynamicPublicEnvVariables.js';

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
		publishableKey: publishableKey || getDynamicPublicEnvVariables().publishableKey,
		signInUrl: signInUrl || getDynamicPublicEnvVariables().signInUrl,
		signUpUrl: signUpUrl || getDynamicPublicEnvVariables().signUpUrl,
		signInForceRedirectUrl:
			signInForceRedirectUrl || getDynamicPublicEnvVariables().signInForceRedirectUrl,
		signUpForceRedirectUrl:
			signUpForceRedirectUrl || getDynamicPublicEnvVariables().signUpForceRedirectUrl,
		signInFallbackRedirectUrl:
			signInFallbackRedirectUrl || getDynamicPublicEnvVariables().signInFallbackRedirectUrl,
		signUpFallbackRedirectUrl:
			signUpFallbackRedirectUrl || getDynamicPublicEnvVariables().signUpFallbackRedirectUrl,
		clerkJSUrl: clerkJSUrl || getDynamicPublicEnvVariables().clerkJSUrl,
		clerkJSVersion: clerkJSVersion || getDynamicPublicEnvVariables().clerkJSVersion,
		proxyUrl: proxyUrl || getDynamicPublicEnvVariables().proxyUrl,
		domain: domain || getDynamicPublicEnvVariables().domain,
		telemetry: telemetry || {
			debug: getDynamicPublicEnvVariables().telemetryDebug,
			disabled: getDynamicPublicEnvVariables().telemetryDisabled
		}
	};
}

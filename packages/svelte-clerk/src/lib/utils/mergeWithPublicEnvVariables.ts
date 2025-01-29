import type { LoadClerkJsScriptOptions } from '@clerk/shared';
import { getStaticPublicEnvVariables } from './getStaticPublicEnvVariables.js';

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

import { createClerkClient } from '@clerk/backend';
import type { RequestEvent } from '@sveltejs/kit';

export const clerkClient = (eventOrLocals: RequestEvent | App.Locals) => {
	const config = ('locals' in eventOrLocals ? eventOrLocals.locals : eventOrLocals).__internal_clerk_config;
	if (!config) {
		throw new Error(
			'Clerk is not configured. Ensure withClerkHandler is used in hooks.server.ts.'
		);
	}
	return createClerkClient({
		secretKey: config.secretKey,
		publishableKey: config.publishableKey,
		apiUrl: config.apiUrl,
		apiVersion: config.apiVersion,
		jwtKey: config.jwtKey,
		proxyUrl: config.proxyUrl,
		domain: config.domain,
		isSatellite: config.isSatellite,
		telemetry: {
			disabled: config.telemetry?.disabled,
			debug: config.telemetry?.debug
		}
	});
};

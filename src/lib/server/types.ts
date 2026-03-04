import type { AuthenticateRequestOptions } from '@clerk/backend/internal';
import type { InitialState } from '@clerk/shared/types';

export type ClerkSvelteKitMiddlewareOptions = AuthenticateRequestOptions & {
	debug?: boolean;
	telemetry?: {
		disabled?: boolean;
		debug?: boolean;
	};
};

export type ClerkPageData = {
	initialState?: InitialState;
	publishableKey?: string;
	signInUrl?: string;
	signUpUrl?: string;
	proxyUrl?: string;
	domain?: string;
	isSatellite?: boolean;
	telemetry?: {
		disabled?: boolean;
		debug?: boolean;
	};
};

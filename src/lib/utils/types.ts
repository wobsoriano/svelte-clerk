import type {
	Clerk as ClerkMain,
	ClerkOptions,
	ClientResource,
	SDKMetadata,
	Without
} from '@clerk/types';

export type ClerkInitOptions = Without<ClerkOptions, 'isSatellite'> & {
	publishableKey: string;
	clerkJSUrl?: string;
	clerkJSVariant?: 'headless' | '';
	clerkJSVersion?: string;
	sdkMetadata?: SDKMetadata;
};

interface HeadlessBrowserClerk extends ClerkMain {
	load: (opts?: Without<ClerkOptions, 'isSatellite'>) => Promise<void>;
	updateClient: (client: ClientResource) => void;
}

interface BrowserClerk extends HeadlessBrowserClerk {
	onComponentsReady: Promise<void>;
	components: unknown;
}

export type Clerk = HeadlessBrowserClerk | BrowserClerk;

declare global {
	interface Window {
		Clerk: Clerk;
	}
}

import type { Clerk as ClerkMain, ClerkOptions, ClientResource, Without } from '@clerk/types';

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

import type { Clerk, ClerkOptions, ClientResource, Without } from '@clerk/types';

export interface HeadlessBrowserClerk extends Clerk {
	load: (opts?: Without<ClerkOptions, 'isSatellite'>) => Promise<void>;
	updateClient: (client: ClientResource) => void;
}

export interface BrowserClerk extends HeadlessBrowserClerk {
	onComponentsReady: Promise<void>;
	components: unknown;
}

declare global {
	interface Window {
		Clerk: HeadlessBrowserClerk | BrowserClerk;
	}
}

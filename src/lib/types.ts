import type { LoadClerkJsScriptOptions } from '@clerk/shared';
import type { Clerk, ClerkOptions, ClientResource, Without } from '@clerk/types';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

export interface HeadlessBrowserClerk extends Clerk {
	load: (opts?: Without<ClerkOptions, 'isSatellite'>) => Promise<void>;
	updateClient: (client: ClientResource) => void;
}

export interface BrowserClerk extends HeadlessBrowserClerk {
	onComponentsReady: Promise<void>;
	components: unknown;
}

export type PropsWithChildren<T, P> = T & { children?: Snippet<[P]> };

export type ClerkProviderProps = LoadClerkJsScriptOptions & {
	children: Snippet;
};

declare global {
	interface Window {
		Clerk: HeadlessBrowserClerk | BrowserClerk;
	}
}

export type ButtonProps = Pick<HTMLButtonAttributes, 'style' | 'class'> & {
	asChild?: boolean;
};

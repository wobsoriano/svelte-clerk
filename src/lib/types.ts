import type { ClerkUIConstructor, IsomorphicClerkOptions, InternalClerkScriptProps } from '@clerk/shared/types';
import type { Clerk, ClerkOptions, ClientResource, Without, InitialState } from '@clerk/shared/types';
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

export type ClerkProviderProps = Omit<IsomorphicClerkOptions, keyof InternalClerkScriptProps> & {
	children?: Snippet;
	initialState?: InitialState;
	proxyUrl?: string | ((url: URL) => string);
	domain?: string | ((url: URL) => string);
	isSatellite?: boolean | ((url: URL) => boolean);
	telemetry?: {
		disabled?: boolean;
		debug?: boolean;
	};
};

declare global {
	interface Window {
		Clerk: HeadlessBrowserClerk | BrowserClerk;
		__internal_ClerkUICtor?: ClerkUIConstructor;
	}
}

export type ButtonProps = Pick<HTMLButtonAttributes, 'style' | 'class'> & {
	asChild?: boolean;
};

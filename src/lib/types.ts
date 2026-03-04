import type { ClerkUIConstructor, IsomorphicClerkOptions, MultiDomainAndOrProxy } from '@clerk/shared/types';
import type { Clerk, ClerkOptions, ClientResource, Without } from '@clerk/shared/types';
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

// Match the Vue SDK pattern: re-add MultiDomainAndOrProxy (which includes isSatellite)
// since IsomorphicClerkOptions strips it via Without<ClerkOptions, 'isSatellite'>
export type ClerkProviderProps = Without<IsomorphicClerkOptions, 'domain' | 'proxyUrl'> &
	MultiDomainAndOrProxy & {
		children?: Snippet;
	};

declare global {
	interface Window {
		Clerk: HeadlessBrowserClerk | BrowserClerk;
		__internal_ClerkUICtor: ClerkUIConstructor
	}
}

export type ButtonProps = Pick<HTMLButtonAttributes, 'style' | 'class'> & {
	asChild?: boolean;
};

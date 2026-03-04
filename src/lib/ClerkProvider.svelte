<script lang="ts">
	import ClerkProvider from '$lib/client/ClerkProvider.svelte';
	import type { ClerkProviderProps } from '$lib/types.js';
	import { page } from '$app/state';
	import { goto, pushState, replaceState } from '$app/navigation';

	const {
		children,
		...props
	}: Omit<ClerkProviderProps, 'routerPush' | 'routerReplace' | 'publishableKey'> & {
		publishableKey?: string;
	} = $props();

	const merged = $derived({
		...(page?.data?.__clerk ?? {}),
		...props
	});

	type RouterMetadata = { __internal_metadata?: { navigationType?: 'internal' | 'external' | 'window' } };

	const routerPush = (to: string, metadata?: RouterMetadata) => {
		// Internal navigations are tab/step changes within a Clerk component (e.g. /sign-in → /sign-in/factor-one).
		// Use SvelteKit's shallow pushState so the URL updates without unmounting the page,
		// while still keeping SvelteKit's router in sync (so hard-refresh at the new URL works).
		if (metadata?.__internal_metadata?.navigationType === 'internal') {
			pushState(to, {});
		} else {
			goto(to);
		}
	};

	const routerReplace = (to: string, metadata?: RouterMetadata) => {
		if (metadata?.__internal_metadata?.navigationType === 'internal') {
			replaceState(to, {});
		} else {
			goto(to, { replaceState: true });
		}
	};
</script>

<ClerkProvider
	{...(merged as any)}
	{routerPush}
	{routerReplace}
>
	{@render children?.()}
</ClerkProvider>

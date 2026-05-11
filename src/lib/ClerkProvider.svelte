<script lang="ts">
	import ClerkProvider from '$lib/client/ClerkProvider.svelte';
	import { mergeWithPublicEnvVariables } from '$lib/utils/mergeWithPublicEnvVariables.js';
	import type { ClerkProviderProps } from '$lib/types.js';
	import { page } from '$app/state';
	import { goto, pushState, replaceState } from '$app/navigation';

	const {
		children,
		...props
	}: Omit<ClerkProviderProps, 'publishableKey'> & {
		publishableKey?: string;
	} = $props();

	type RouterMetadata = {
		__internal_metadata?: { navigationType?: 'internal' | 'external' | 'window' };
	};

	const mergedProps = $derived({
		...props,
		...mergeWithPublicEnvVariables(props),
		routerPush: (to: string, metadata?: RouterMetadata) => {
			// Internal navigations are tab/step changes within a Clerk component (e.g. /sign-in → /sign-in/factor-one).
			// Use SvelteKit's shallow pushState so the URL updates without unmounting the page,
			// while still keeping SvelteKit's router in sync (so hard-refresh at the new URL works).
			if (metadata?.__internal_metadata?.navigationType === 'internal') {
				pushState(to, {});
			} else {
				goto(to);
			}
		},
		routerReplace: (to: string, metadata?: RouterMetadata) => {
			if (metadata?.__internal_metadata?.navigationType === 'internal') {
				replaceState(to, {});
			} else {
				goto(to, { replaceState: true });
			}
		}
	});
</script>

<ClerkProvider initialState={page?.data?.initialState} {...mergedProps}>
	{@render children?.()}
</ClerkProvider>

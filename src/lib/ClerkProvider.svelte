<script lang="ts">
	import ClerkProvider from '$lib/client/ClerkProvider.svelte';
	import { mergeWithPublicEnvVariables } from '$lib/utils/mergeWithPublicEnvVariables.js';
	import type { ClerkProviderProps } from '$lib/types.js';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	const {
		children,
		...props
	}: Omit<ClerkProviderProps, 'publishableKey'> & {
		publishableKey?: string;
	} = $props();

	const mergedProps = $derived({
		...props,
		...mergeWithPublicEnvVariables(props),
		routerPush: (to: string) => goto(to),
		routerReplace: (to: string) => goto(to, { replaceState: true })
	} as Omit<ClerkProviderProps, 'children'>);
</script>

<ClerkProvider initialState={page?.data?.initialState} {...(mergedProps as any)}>
	{@render children?.()}
</ClerkProvider>

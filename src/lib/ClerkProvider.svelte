<script lang="ts">
	import ClerkProvider from '$lib/client/ClerkProvider.svelte';
	import { mergeWithPublicEnvVariables } from '$lib/utils/mergeWithPublicEnvVariables.js';
	import type { ClerkProviderProps } from '$lib/types.js';
	import { page } from '$app/state';
	import type { LoadClerkJsScriptOptions } from '@clerk/shared';

	const {
		children,
		...props
	}: Omit<ClerkProviderProps, 'publishableKey'> & {
		publishableKey?: string;
	} = $props();
	const mergedProps = mergeWithPublicEnvVariables(props) as LoadClerkJsScriptOptions;
</script>

<ClerkProvider initialState={page?.data?.initialState} {...mergedProps}>
	{@render children()}
</ClerkProvider>

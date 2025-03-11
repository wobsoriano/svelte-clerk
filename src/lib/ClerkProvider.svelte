<script lang="ts">
	import ClerkProvider from '$lib/client/ClerkProvider.svelte';
	import { mergeWithPublicEnvVariables } from '$lib/utils/mergeWithPublicEnvVariables.js';
	import type { ClerkProviderProps } from '$lib/types.js';

	const { children, ...props }: Omit<ClerkProviderProps, 'publishableKey'> & {
		publishableKey?: string;
	} = $props();
	const mergedProps = mergeWithPublicEnvVariables(props);
</script>

<ClerkProvider {...mergedProps}>
	{@render children()}
</ClerkProvider>

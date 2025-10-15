<script lang="ts">
	import ClerkProvider from '$lib/client/ClerkProvider.svelte';
	import { mergeWithPublicEnvVariables } from '$lib/utils/mergeWithPublicEnvVariables.js';
	import type { ClerkProviderProps } from '$lib/types.js';
	import type { LoadClerkJsScriptOptions } from '@clerk/shared/loadClerkJsScript';
	import { goto } from '$app/navigation';
	import { getInitialAuthState } from './functions/auth.remote'

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
		routerReplace: (to: string) => goto(to, { replaceState: true }),
	} as LoadClerkJsScriptOptions);
</script>

<ClerkProvider initialState={await getInitialAuthState()} {...mergedProps}>
	{@render children()}
</ClerkProvider>

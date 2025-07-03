<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { SignInProps } from '@clerk/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';
	import { useFallbackComponent } from '$lib/utils/waitForComponentMount.svelte';
	import type { ComponentWithFallback } from '$lib/types';

	const { fallback, ...props }: ComponentWithFallback<SignInProps> = $props();

	const component = useFallbackComponent('SignIn', fallback);
</script>

{#if fallback && component.shouldShowFallback}
	{@render fallback()}
{/if}

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			{...component.rootAttributes}
			use:clerkHostRenderer={{
				mount: clerk.mountSignIn,
				unmount: clerk.unmountSignIn,
				updateProps: (clerk as any).__unstable__updateProps,
				props: $state.snapshot(props)
			}}
		></div>
	{/snippet}
</ClerkLoaded>

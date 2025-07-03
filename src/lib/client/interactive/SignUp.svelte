<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { SignUpProps } from '@clerk/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';
	import type { ComponentWithFallback } from '$lib/types';
	import { useFallbackComponent } from '$lib/utils/waitForComponentMount.svelte';

	const { fallback, ...props }: ComponentWithFallback<SignUpProps> = $props();

	const component = useFallbackComponent('SignUp', fallback);
</script>

{#if fallback && component.shouldShowFallback}
	{@render fallback()}
{/if}

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			{...component.rootAttributes}
			use:clerkHostRenderer={{
				mount: clerk.mountSignUp,
				unmount: clerk.unmountSignUp,
				updateProps: (clerk as any).__unstable__updateProps,
				props: $state.snapshot(props)
			}}
		></div>
	{/snippet}
</ClerkLoaded>

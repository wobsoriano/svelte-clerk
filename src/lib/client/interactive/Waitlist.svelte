<script lang="ts">
	import { clerkUI } from '$lib/action.js';
	import type { WaitlistProps } from '@clerk/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';

	const props: WaitlistProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			use:clerkUI={{
				mount: clerk.mountWaitlist,
				unmount: clerk.unmountWaitlist,
				updateProps: (clerk as any).__unstable__updateProps,
				props: $state.snapshot(props)
			}}
		></div>
	{/snippet}
</ClerkLoaded>

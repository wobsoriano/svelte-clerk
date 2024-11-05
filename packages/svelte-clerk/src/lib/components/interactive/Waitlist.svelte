<script lang="ts">
	import clerkUI from '$lib/action.js';
	import type { WaitlistProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: WaitlistProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div use:clerkUI={{ clerk, component: 'Waitlist', props: $state.snapshot(props) }}></div>
	{/snippet}
</ClerkLoaded>

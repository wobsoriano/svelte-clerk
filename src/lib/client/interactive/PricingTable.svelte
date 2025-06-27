<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { PricingTableProps } from '@clerk/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';

	const props: PricingTableProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			use:clerkHostRenderer={{
				mount: clerk.mountPricingTable,
				unmount: clerk.unmountPricingTable,
				updateProps: (clerk as any).__unstable__updateProps,
				props: $state.snapshot(props)
			}}
		></div>
	{/snippet}
</ClerkLoaded>

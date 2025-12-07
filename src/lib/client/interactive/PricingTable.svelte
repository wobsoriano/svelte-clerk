<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { PricingTableProps } from '@clerk/shared/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';
	import { fromAction } from 'svelte/attachments';

	const props: PricingTableProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			{@attach fromAction(clerkHostRenderer, () => ({
				mount: clerk.mountPricingTable,
				unmount: clerk.unmountPricingTable,
				updateProps: (clerk as any).__unstable__updateProps,
				props: $state.snapshot(props)
			}))}
		></div>
	{/snippet}
</ClerkLoaded>

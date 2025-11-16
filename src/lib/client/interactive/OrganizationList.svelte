<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { OrganizationListProps } from '@clerk/shared/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';

	const props: OrganizationListProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			use:clerkHostRenderer={{
				mount: clerk.mountOrganizationList,
				unmount: clerk.unmountOrganizationList,
				updateProps: (clerk as any).__unstable__updateProps,
				props: $state.snapshot(props)
			}}
		></div>
	{/snippet}
</ClerkLoaded>

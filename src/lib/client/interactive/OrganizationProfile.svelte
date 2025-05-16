<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { OrganizationProfileProps } from '@clerk/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';

	const props: OrganizationProfileProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			use:clerkHostRenderer={{
				mount: clerk.mountOrganizationProfile,
				unmount: clerk.unmountOrganizationProfile,
				updateProps: (clerk as any).__unstable__updateProps,
				props: $state.snapshot(props)
			}}
		></div>
	{/snippet}
</ClerkLoaded>

<script lang="ts">
	import { clerkUI } from '$lib/action.js';
	import type { OrganizationProfileProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: OrganizationProfileProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			use:clerkUI={{
				mount: clerk.mountOrganizationProfile,
				unmount: clerk.unmountOrganizationProfile,
				updateProps: (clerk as any).__unstable_updateProps,
				props: $state.snapshot(props)
			}}
		></div>
	{/snippet}
</ClerkLoaded>

<script lang="ts">
	import { clerkHostRenderer, getUpdateProps } from '$lib/action.js';
	import type { OrganizationProfileProps } from '@clerk/shared/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';
	import { fromAction } from 'svelte/attachments';

	const props: OrganizationProfileProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			{@attach fromAction(clerkHostRenderer, () => ({
				mount: clerk.mountOrganizationProfile,
				unmount: clerk.unmountOrganizationProfile,
				updateProps: getUpdateProps(clerk),
				props: $state.snapshot(props)
			}))}
		></div>
	{/snippet}
</ClerkLoaded>

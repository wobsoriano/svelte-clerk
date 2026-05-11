<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { OrganizationSwitcherProps } from '@clerk/shared/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';
	import { fromAction } from 'svelte/attachments';

	const props: OrganizationSwitcherProps = $props();

	// Access internal Clerk API not exposed in LoadedClerk type
	function getUpdateProps(clerk: { __internal_updateProps?: unknown }) {
		return clerk.__internal_updateProps;
	}
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			{@attach fromAction(clerkHostRenderer, () => ({
				mount: clerk.mountOrganizationSwitcher,
				unmount: clerk.unmountOrganizationSwitcher,
				updateProps: getUpdateProps(clerk),
				props: $state.snapshot(props)
			}))}
		></div>
	{/snippet}
</ClerkLoaded>

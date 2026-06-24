<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { UserProfileProps } from '@clerk/shared/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';
	import { fromAction } from 'svelte/attachments';

	const props: UserProfileProps = $props();

	// Access internal Clerk API not exposed in LoadedClerk type
	function getUpdateProps(clerk: { __internal_updateProps?: unknown }) {
		return clerk.__internal_updateProps;
	}
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			{@attach fromAction(clerkHostRenderer, () => ({
				mount: clerk.mountUserProfile,
				unmount: clerk.unmountUserProfile,
				updateProps: getUpdateProps(clerk),
				props: $state.snapshot(props)
			}))}
		></div>
	{/snippet}
</ClerkLoaded>

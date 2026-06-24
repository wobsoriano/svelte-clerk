<script lang="ts">
	import { clerkHostRenderer, getUpdateProps } from '$lib/action.js';
	import type { OrganizationSwitcherProps } from '@clerk/shared/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';
	import { fromAction } from 'svelte/attachments';

	const props: OrganizationSwitcherProps = $props();
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

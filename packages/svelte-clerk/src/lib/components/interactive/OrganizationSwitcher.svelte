<script lang="ts">
	import { clerkUI } from '$lib/action.js';
	import type { OrganizationSwitcherProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: OrganizationSwitcherProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			use:clerkUI={{
				mount: clerk.mountOrganizationSwitcher,
				unmount: clerk.unmountOrganizationSwitcher,
				props: $state.snapshot(props)
			}}
		></div>
	{/snippet}
</ClerkLoaded>

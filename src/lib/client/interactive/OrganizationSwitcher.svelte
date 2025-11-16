<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { OrganizationSwitcherProps } from '@clerk/shared/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';

	const props: OrganizationSwitcherProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			use:clerkHostRenderer={{
				mount: clerk.mountOrganizationSwitcher,
				unmount: clerk.unmountOrganizationSwitcher,
				updateProps: (clerk as any).__unstable__updateProps,
				props: $state.snapshot(props)
			}}
		></div>
	{/snippet}
</ClerkLoaded>

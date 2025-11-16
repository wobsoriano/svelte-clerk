<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { CreateOrganizationProps } from '@clerk/shared/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';

	const props: CreateOrganizationProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			use:clerkHostRenderer={{
				mount: clerk.mountCreateOrganization,
				unmount: clerk.unmountCreateOrganization,
				updateProps: (clerk as any).__unstable__updateProps,
				props: $state.snapshot(props)
			}}
		></div>
	{/snippet}
</ClerkLoaded>

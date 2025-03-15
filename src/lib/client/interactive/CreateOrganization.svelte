<script lang="ts">
	import { clerkUI } from '$lib/action.js';
	import type { CreateOrganizationProps } from '@clerk/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';

	const props: CreateOrganizationProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			use:clerkUI={{
				mount: clerk.mountCreateOrganization,
				unmount: clerk.unmountCreateOrganization,
				updateProps: (clerk as any).__unstable__updateProps,
				props: $state.snapshot(props)
			}}
		></div>
	{/snippet}
</ClerkLoaded>

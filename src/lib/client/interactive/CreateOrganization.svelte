<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { CreateOrganizationProps } from '@clerk/shared/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';
	import { fromAction } from 'svelte/attachments';

	const props: CreateOrganizationProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
		    {@attach fromAction(clerkHostRenderer, () => ({
				mount: clerk.mountCreateOrganization,
				unmount: clerk.unmountCreateOrganization,
				updateProps: (clerk as any).__unstable__updateProps,
				props: $state.snapshot(props)
			}))}
		></div>
	{/snippet}
</ClerkLoaded>

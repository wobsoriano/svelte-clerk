<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { APIKeysProps } from '@clerk/shared/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';
	import { fromAction } from 'svelte/attachments';

	const props: APIKeysProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			{@attach fromAction(clerkHostRenderer, () => ({
				mount: clerk.mountAPIKeys,
				unmount: clerk.unmountAPIKeys,
				updateProps: (clerk as any).__internal_updateProps,
				props: $state.snapshot(props)
			}))}
		></div>
	{/snippet}
</ClerkLoaded>

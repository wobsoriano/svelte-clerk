<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { UserProfileProps } from '@clerk/shared/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';
	import { fromAction } from 'svelte/attachments';

	const props: UserProfileProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			{@attach fromAction(clerkHostRenderer, () => ({
				mount: clerk.mountUserProfile,
				unmount: clerk.unmountUserProfile,
				updateProps: (clerk as any).__unstable__updateProps,
				props: $state.snapshot(props)
			}))}
		></div>
	{/snippet}
</ClerkLoaded>

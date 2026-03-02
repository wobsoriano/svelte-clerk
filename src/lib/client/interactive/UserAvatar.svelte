<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { UserAvatarProps } from '@clerk/shared/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';
	import { fromAction } from 'svelte/attachments';

	const props: UserAvatarProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			{@attach fromAction(clerkHostRenderer, () => ({
				mount: clerk.mountUserAvatar,
				unmount: clerk.unmountUserAvatar,
				updateProps: (clerk as any).__internal_updateProps,
				props: $state.snapshot(props)
			}))}
		></div>
	{/snippet}
</ClerkLoaded>

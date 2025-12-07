<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { SignInProps } from '@clerk/shared/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';
	import { fromAction } from 'svelte/attachments';

	const props: SignInProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			{@attach fromAction(clerkHostRenderer, () => ({
               	mount: clerk.mountSignIn,
               	unmount: clerk.unmountSignIn,
               	updateProps: (clerk as any).__unstable__updateProps,
               	props: $state.snapshot(props)
            }))}
		></div>
	{/snippet}
</ClerkLoaded>

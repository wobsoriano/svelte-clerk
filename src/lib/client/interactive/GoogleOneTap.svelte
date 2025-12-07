<script lang="ts">
	import { clerkHostRenderer } from '$lib/action.js';
	import type { GoogleOneTapProps } from '@clerk/shared/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';
	import { fromAction } from 'svelte/attachments';

	const props: GoogleOneTapProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			{@attach fromAction(clerkHostRenderer, () => ({
				open: clerk.openGoogleOneTap,
				close: clerk.closeGoogleOneTap,
				props: $state.snapshot(props)
			}))}
		></div>
	{/snippet}
</ClerkLoaded>

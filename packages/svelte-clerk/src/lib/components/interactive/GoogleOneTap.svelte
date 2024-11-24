<script lang="ts">
	import { clerkUI } from '$lib/action.js';
	import type { GoogleOneTapProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: GoogleOneTapProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			use:clerkUI={{
				open: clerk.openGoogleOneTap,
				close: clerk.closeGoogleOneTap,
				props: $state.snapshot(props)
			}}
		></div>
	{/snippet}
</ClerkLoaded>

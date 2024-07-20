<script lang="ts">
	import clerkUI from '$lib/action.js';
	import type { GoogleOneTapProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: GoogleOneTapProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div use:clerkUI={{ clerk, component: 'GoogleOneTap', props }}></div>
	{/snippet}
</ClerkLoaded>

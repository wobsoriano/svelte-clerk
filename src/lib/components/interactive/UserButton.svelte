<script lang="ts">
	import clerkUI from '$lib/action.js';
	import type { UserButtonProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: UserButtonProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div use:clerkUI={{ clerk, component: 'UserButton', props }}></div>
	{/snippet}
</ClerkLoaded>

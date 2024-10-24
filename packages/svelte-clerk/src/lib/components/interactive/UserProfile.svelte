<script lang="ts">
	import clerkUI from '$lib/action.js';
	import type { UserProfileProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: UserProfileProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div use:clerkUI={{ clerk, component: 'UserProfile', props }}></div>
	{/snippet}
</ClerkLoaded>

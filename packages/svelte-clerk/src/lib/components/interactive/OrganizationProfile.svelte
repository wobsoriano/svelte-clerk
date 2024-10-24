<script lang="ts">
	import clerkUI from '$lib/action.js';
	import type { OrganizationProfileProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: OrganizationProfileProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div use:clerkUI={{ clerk, component: 'OrganizationProfile', props }}></div>
	{/snippet}
</ClerkLoaded>

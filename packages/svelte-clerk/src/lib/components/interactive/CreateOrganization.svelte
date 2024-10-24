<script lang="ts">
	import clerkUI from '$lib/action.js';
	import type { CreateOrganizationProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: CreateOrganizationProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div use:clerkUI={{ clerk, component: 'CreateOrganization', props }}></div>
	{/snippet}
</ClerkLoaded>

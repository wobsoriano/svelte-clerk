<script lang="ts">
	import clerkUI from '$lib/action.js';
	import type { OrganizationProfileProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: OrganizationProfileProps = $props();
</script>

<ClerkLoaded>
	<div use:clerkUI={{ component: 'OrganizationProfile', props }}></div>
</ClerkLoaded>

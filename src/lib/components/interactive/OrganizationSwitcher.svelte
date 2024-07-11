<script lang="ts">
	import clerkUI from '$lib/action.js';
	import type { OrganizationSwitcherProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: OrganizationSwitcherProps = $props();
</script>

<ClerkLoaded>
	<div use:clerkUI={{ component: 'OrganizationSwitcher', props }}></div>
</ClerkLoaded>

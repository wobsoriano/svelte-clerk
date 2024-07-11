<script lang="ts">
	import clerkUI from '$lib/action.js';
	import type { CreateOrganizationProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: CreateOrganizationProps = $props();
</script>

<ClerkLoaded>
	<div use:clerkUI={{ component: 'CreateOrganization', props }}></div>
</ClerkLoaded>

<script lang="ts">
	import clerkUI from '$lib/action.js';
	import type { UserButtonProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: UserButtonProps = $props();
</script>

<ClerkLoaded>
	<div use:clerkUI={{ component: 'UserButton', props }}></div>
</ClerkLoaded>

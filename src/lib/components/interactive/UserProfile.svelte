<script lang="ts">
	import clerkUI from '$lib/action.js';
	import type { UserProfileProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: UserProfileProps = $props();
</script>

<ClerkLoaded>
	<div use:clerkUI={{ component: 'UserProfile', props }}></div>
</ClerkLoaded>

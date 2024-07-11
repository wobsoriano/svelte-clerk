<script lang="ts">
	import clerkUI from '$lib/action.js';
	import type { SignUpProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: SignUpProps = $props();
</script>

<ClerkLoaded>
	<div use:clerkUI={{ component: 'SignUp', props }}></div>
</ClerkLoaded>

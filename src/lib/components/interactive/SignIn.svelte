<script lang="ts">
	import clerkUI from '$lib/action.js';
	import type { SignInProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: SignInProps = $props();
</script>

<ClerkLoaded>
	<div use:clerkUI={{ component: 'SignIn', props }}></div>
</ClerkLoaded>

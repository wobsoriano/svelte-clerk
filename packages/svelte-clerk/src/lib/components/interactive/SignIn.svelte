<script lang="ts">
	import { clerkUI } from '$lib/action.js';
	import type { SignInProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: SignInProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			use:clerkUI={{
				mount: clerk.mountSignIn,
				unmount: clerk.unmountSignIn,
				props: $state.snapshot(props)
			}}
		></div>
	{/snippet}
</ClerkLoaded>

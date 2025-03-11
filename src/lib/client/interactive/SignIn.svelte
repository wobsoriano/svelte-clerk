<script lang="ts">
	import { clerkUI } from '$lib/action.js';
	import type { SignInProps } from '@clerk/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';

	const props: SignInProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			use:clerkUI={{
				mount: clerk.mountSignIn,
				unmount: clerk.unmountSignIn,
				updateProps: (clerk as any).__unstable_updateProps,
				props: $state.snapshot(props)
			}}
		></div>
	{/snippet}
</ClerkLoaded>

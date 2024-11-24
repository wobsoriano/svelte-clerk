<script lang="ts">
	import { clerkUI } from '$lib/action.js';
	import type { SignUpProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';

	const props: SignUpProps = $props();
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div
			use:clerkUI={{
				mount: clerk.mountSignUp,
				unmount: clerk.unmountSignUp,
				props: $state.snapshot(props)
			}}
		></div>
	{/snippet}
</ClerkLoaded>

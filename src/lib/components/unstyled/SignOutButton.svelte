<script lang="ts">
	import { clerkContext } from '$lib/utils/context.js';
	import type { SignOutOptions } from '@clerk/types';
	import type { Snippet } from 'svelte';

	let {
		sessionId,
		redirectUrl = '/',
		children
	}: SignOutOptions & {
		children: Snippet<[string]>;
	} = $props();

	function signOut() {
		const { clerk } = clerkContext.get();

		return clerk?.signOut({ sessionId, redirectUrl });
	}
</script>

<button type="button" onclick={signOut}>
	{@render children('Sign out')}
</button>

<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { SignOutOptions } from '@clerk/types';
	import type { Snippet } from 'svelte';

	const {
		sessionId,
		redirectUrl = '/',
		children
	}: SignOutOptions & {
		children?: Snippet;
	} = $props();

	const ctx = useClerkContext();

	function signOut() {
		return ctx.clerk?.signOut({ sessionId, redirectUrl });
	}
</script>

<button type="button" onclick={signOut}>
	{#if children}
		{@render children()}
	{:else}
		Sign out
	{/if}
</button>

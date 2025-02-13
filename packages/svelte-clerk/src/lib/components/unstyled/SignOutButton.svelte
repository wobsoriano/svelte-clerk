<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { PropsWithChildren } from '$lib/types';
	import type { SignOutOptions } from '@clerk/types';

	const { sessionId, redirectUrl = '/', children }: PropsWithChildren<SignOutOptions> = $props();

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

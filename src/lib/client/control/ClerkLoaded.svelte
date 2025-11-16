<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { Snippet } from 'svelte';
	import type { LoadedClerk } from '@clerk/shared/types';

	const { children }: { children: Snippet<[LoadedClerk]> } = $props();

	const ctx = useClerkContext();
</script>

{#if ctx.isLoaded}
	{@render children(ctx.clerk as LoadedClerk)}
{/if}

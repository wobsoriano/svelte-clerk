<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { Snippet } from 'svelte';
	import type { LoadedClerk } from '@clerk/shared/types';

	const { children }: { children: Snippet<[LoadedClerk]> } = $props();

	const ctx = useClerkContext();

	function getLoadedClerk(): LoadedClerk {
		return ctx.clerk as LoadedClerk;
	}
</script>

{#if ctx.isLoaded}
	{@render children(getLoadedClerk())}
{/if}

<script lang="ts">
	import { clerkContext } from '$lib/utils/context.js';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

{#if !clerkContext.get().isLoaded}
	{@render children()}
{/if}

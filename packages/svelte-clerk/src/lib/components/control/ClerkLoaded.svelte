<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { Snippet } from 'svelte';
	import type { HeadlessBrowserClerk, BrowserClerk } from '$lib/types.js';

	const { children }: { children: Snippet<[HeadlessBrowserClerk | BrowserClerk]> } = $props();

	const ctx = useClerkContext();
</script>

{#if ctx.isLoaded}
	{@render children(ctx.clerk!)}
{/if}

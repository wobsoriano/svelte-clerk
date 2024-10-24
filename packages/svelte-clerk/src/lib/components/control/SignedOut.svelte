<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();

	const ctx = useClerkContext();
</script>

{#if ctx.auth.userId === null}
	{@render children()}
{/if}

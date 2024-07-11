<script lang="ts">
	import { auth } from '$lib/runes/index.js';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

{#if auth.current.userId}
	{@render children()}
{/if}

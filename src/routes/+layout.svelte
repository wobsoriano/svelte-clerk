<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ClerkProvider } from '$lib/components';
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

	let { children }: { children: Snippet } = $props();
</script>

<nav>
	<a href="/">home</a>
	<a href="/sign-in">sign-in</a>
	<a href="/sign-up">sign-up</a>
	<a href="/protected">protected</a>
</nav>

<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
	{@render children()}
</ClerkProvider>

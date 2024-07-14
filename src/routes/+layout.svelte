<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ClerkProvider } from '$lib/components';
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<nav>
	<a href="/">home</a>
	<a href="/sign-in">sign-in</a>
	<a href="/sign-up">sign-up</a>
	<a href="/protected">protected</a>
</nav>

<ClerkProvider initialState={data.initialState} publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
	{@render children()}
</ClerkProvider>

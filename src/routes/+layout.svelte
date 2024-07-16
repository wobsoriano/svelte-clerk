<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ClerkProvider } from '$lib/components';
	import {
		PUBLIC_CLERK_PUBLISHABLE_KEY,
		PUBLIC_CLERK_SIGN_IN_URL,
		PUBLIC_CLERK_SIGN_UP_URL
	} from '$env/static/public';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<!--
<nav>
	<a href="/">home</a>
	<a href="/sign-in">sign-in</a>
	<a href="/sign-up">sign-up</a>
	<a href="/protected">protected</a>
</nav> -->

<ClerkProvider
    {...data}
	signInUrl={PUBLIC_CLERK_SIGN_IN_URL}
	signUpUrl={PUBLIC_CLERK_SIGN_UP_URL}
	publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}
>
	{@render children()}
</ClerkProvider>

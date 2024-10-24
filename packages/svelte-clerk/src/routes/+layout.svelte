<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { ClerkProvider } from '$lib/components';
	import Header from '../components/Header.svelte';
	import {
		PUBLIC_CLERK_PUBLISHABLE_KEY,
		PUBLIC_CLERK_SIGN_IN_URL,
		PUBLIC_CLERK_SIGN_UP_URL
	} from '$env/static/public';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<ClerkProvider
	{...data}
	signInUrl={PUBLIC_CLERK_SIGN_IN_URL}
	signUpUrl={PUBLIC_CLERK_SIGN_UP_URL}
	publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}
>
	<Header />
	<main class="container mx-auto">
		<div class="flex items-start justify-center min-h-screen">
			<div class="mt-20">{@render children()}</div>
		</div>
	</main>
</ClerkProvider>

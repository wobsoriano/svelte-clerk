<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { ClerkProvider } from '$lib/components';
	import Header from '../components/Header.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<ClerkProvider>
	<Header />
	<main class="container mx-auto">
		<div class="flex items-start justify-center min-h-screen">
			<div class="mt-20">{@render children()}</div>
		</div>
	</main>
</ClerkProvider>

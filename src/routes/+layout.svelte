<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { ClerkProvider } from '$lib/index.js';
	import Header from '../components/Header.svelte';
	import type { LocalizationResource } from '@clerk/shared/types';

	let { children }: { children: Snippet } = $props();
	let selected = $state<'en' | 'fr'>('en');
	let localization = $state<LocalizationResource>();

	const onLocaleChange = async () => {
		localization =
			selected === 'fr' ? (await import('@clerk/localizations/fr-FR')).frFR : undefined;
	};
</script>

<ClerkProvider {localization}>
	<Header bind:selectedLocale={selected} {onLocaleChange} />
	<main class="container mx-auto">
		<div class="flex items-start justify-center min-h-screen">
			<div class="mt-20">{@render children()}</div>
		</div>
	</main>
</ClerkProvider>

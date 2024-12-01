<script lang="ts">
	import type { Snippet } from 'svelte';
	import { untrack } from 'svelte';
	import type { ClientResource, Resources } from '@clerk/types';
	import { setClerkContext } from '$lib/context.js';
	import { deriveState } from '@clerk/shared/deriveState';
	import type { HeadlessBrowserClerk, BrowserClerk } from '$lib/types.js';
	import { page } from '$app/stores';

	import {
		loadClerkJsScript,
		setClerkJsLoadingErrorPackageName,
		type LoadClerkJsScriptOptions
	} from '@clerk/shared/loadClerkJsScript';
	import { goto } from '$app/navigation';

	const {
		children,
		...clerkInitOptions
	}: LoadClerkJsScriptOptions & {
		children: Snippet;
	} = $props();

	let clerk = $state<HeadlessBrowserClerk | BrowserClerk | null>(null);
	let isLoaded = $state(false);
	let resources = $state<Resources>({
		client: {} as ClientResource,
		session: undefined,
		user: undefined,
		organization: undefined
	});

	let auth = $derived(deriveState(isLoaded, resources, $page?.data?.initialState));
	let client = $derived(resources.client);
	let session = $derived(auth.session);
	let user = $derived(auth.user);
	let organization = $derived(auth.organization);

	setClerkJsLoadingErrorPackageName('svelte-clerk');

	async function loadClerk() {
		const opts: LoadClerkJsScriptOptions = {
			...clerkInitOptions,
			routerPush: (to: string) => goto(to),
			routerReplace: (to: string) => goto(to, { replaceState: true })
		};

		await loadClerkJsScript(opts);

		if (!window.Clerk) {
			throw new Error('Clerk script failed to load');
		}

		clerk = window.Clerk;
		await clerk.load(opts);

		isLoaded = true;

		clerk.addListener((payload) => {
			resources = payload;
		});
	}

	$effect(() => {
		untrack(() => loadClerk());
	});

	$effect(() => {
		if (!isLoaded) {
			return;
		}

		// @ts-expect-error: Internal clerk property that is not exposed
		clerk?.__unstable__updateProps({
			appearance: clerkInitOptions.appearance
		});
	});

	$effect(() => {
		if (!isLoaded) {
			return;
		}

		// @ts-expect-error: Internal clerk property that is not exposed
		clerk?.__unstable__updateProps({
			options: {
				...clerkInitOptions,
				localization: clerkInitOptions.localization
			}
		});
	});

	setClerkContext({
		get clerk() {
			return clerk;
		},
		get isLoaded() {
			return isLoaded;
		},
		get auth() {
			return auth;
		},
		get client() {
			return client;
		},
		get session() {
			return session;
		},
		get user() {
			return user;
		},
		get organization() {
			return organization;
		}
	});
</script>

{@render children()}

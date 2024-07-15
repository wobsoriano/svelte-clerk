<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClientResource, InitialState, Resources } from '@clerk/types';
	import { setClerkContext } from '$lib/context.js';
	import { deriveState } from '$lib/utils/deriveState.js';
	import type { Clerk, ClerkInitOptions } from '$lib/utils/types.js';
	import { loadClerkJsScript } from '$lib/utils/loadClerkJsScript.js';

	const {
		children,
		initialState,
		...clerkInitOptions
	}: ClerkInitOptions & {
		children: Snippet;
		initialState?: InitialState;
	} = $props();

	let clerk = $state<Clerk | null>(null);
	let isLoaded = $state(false);
	let resources = $state<Resources>({
		client: {} as ClientResource,
		session: undefined,
		user: undefined,
		organization: undefined
	});

	let auth = $derived(deriveState(isLoaded, resources, initialState));
	let client = $derived(resources.client);
	let session = $derived(auth.session);
	let user = $derived(auth.user);
	let organization = $derived(auth.organization);

	async function loadClerk() {
		await loadClerkJsScript(clerkInitOptions);

		if (!window.Clerk) {
			throw new Error('Clerk script failed to load');
		}

		clerk = window.Clerk;
		await clerk.load(clerkInitOptions);

		isLoaded = true;

		clerk.addListener((payload) => {
			resources = payload;
			clerk = window.Clerk;
		});
	}

	$effect(() => {
		loadClerk();
	});

	$effect(() => {
		// @ts-expect-error: Internal
		clerk?.__unstable__updateProps({ appearance: clerkInitOptions.appearance });
	});

	$effect(() => {
		// @ts-expect-error: Internal
		clerk?.__unstable__updateProps({ localization: clerkInitOptions.localization });
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

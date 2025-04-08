<script lang="ts">
	import { untrack } from 'svelte';
	import type { ClientResource, InitialState, Resources } from '@clerk/types';
	import { setClerkContext } from '$lib/context.js';
	import { deriveState } from '@clerk/shared/deriveState';
	import type { ClerkProviderProps, HeadlessBrowserClerk, BrowserClerk } from '$lib/types.js';

	import {
		loadClerkJsScript,
		setClerkJsLoadingErrorPackageName,
		type LoadClerkJsScriptOptions
	} from '@clerk/shared/loadClerkJsScript';
	import { goto } from '$app/navigation';
	import { removeNetlifyCacheBustParam } from '$lib/utils/netlifyCacheBust';

	const {
		children,
		initialState,
		...clerkInitOptions
	}: ClerkProviderProps & {
		initialState?: InitialState;
	} = $props();

	let clerk = $state<HeadlessBrowserClerk | BrowserClerk | null>(null);
	let isLoaded = $state(false);
	let resources = $state<Resources>({
		client: undefined as unknown as ClientResource,
		session: undefined,
		user: undefined,
		organization: undefined
	});

	const auth = $derived(deriveState(isLoaded, resources, initialState));
	const client = $derived(resources.client);
	const session = $derived(auth.session);
	const user = $derived(auth.user);
	const organization = $derived(auth.organization);

	setClerkJsLoadingErrorPackageName('svelte-clerk');

	async function loadClerk() {
		const opts = {
			routerPush: (to: string) => goto(to),
			routerReplace: (to: string) => goto(to, { replaceState: true }),
			...clerkInitOptions
		};

		await loadClerkJsScript(opts as LoadClerkJsScriptOptions);

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
		untrack(() => {
			removeNetlifyCacheBustParam();
			loadClerk();
		});
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

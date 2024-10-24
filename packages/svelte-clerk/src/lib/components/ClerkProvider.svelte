<script lang="ts">
	import type { Snippet } from 'svelte';
	import { untrack } from 'svelte';
	import type { ClientResource, InitialState, Resources } from '@clerk/types';
	import { setClerkContext } from '$lib/context.js';
	import { deriveState } from '@clerk/shared/deriveState';
	import type { HeadlessBrowserClerk, BrowserClerk } from '$lib/types.js';
	import {
		loadClerkJsScript,
		setClerkJsLoadingErrorPackageName,
		type LoadClerkJsScriptOptions
	} from '@clerk/shared/loadClerkJsScript';
	import { goto } from '$app/navigation';
	import { isTruthy } from '@clerk/shared/underscore';
	import { env as publicEnv } from '$env/dynamic/public';

	const {
		children,
		initialState,
		...clerkInitOptions
	}: LoadClerkJsScriptOptions & {
		children: Snippet;
		initialState?: InitialState;
	} = $props();

	let clerk = $state<HeadlessBrowserClerk | BrowserClerk | null>(null);
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

	setClerkJsLoadingErrorPackageName('svelte-clerk');

	async function loadClerk() {
		const opts: LoadClerkJsScriptOptions = {
			...clerkInitOptions,
			telemetry: clerkInitOptions.telemetry || {
				disabled: isTruthy(publicEnv.PUBLIC_CLERK_TELEMETRY_DISABLED),
				debug: isTruthy(publicEnv.PUBLIC_CLERK_TELEMETRY_DEBUG)
			},
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
		// @ts-expect-error: Internal
		clerk?.__unstable__updateProps({
			appearance: clerkInitOptions.appearance
		});
	});

	$effect(() => {
		// @ts-expect-error: Internal
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

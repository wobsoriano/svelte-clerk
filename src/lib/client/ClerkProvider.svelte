<script lang="ts">
	import { untrack } from 'svelte';
	import type { ClientResource, InitialState, Resources } from '@clerk/shared/types';
	import { setClerkContext } from '$lib/context.js';
	import { deriveState } from '@clerk/shared/deriveState';
	import type { ClerkProviderProps, HeadlessBrowserClerk, BrowserClerk } from '$lib/types.js';

	import {
		loadClerkJsScript,
		setClerkJsLoadingErrorPackageName
	} from '@clerk/shared/loadClerkJsScript';
	import { watch } from './utils.svelte';

	const {
		children,
		initialState,
		...props
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
		await loadClerkJsScript(props);

		if (!window.Clerk) {
			throw new Error('Clerk script failed to load');
		}

		clerk = window.Clerk;
		await clerk.load(props);

		isLoaded = true;

		clerk.addListener((payload) => {
			resources = payload;
		});
	}

	$effect(() => {
		untrack(() => {
			loadClerk();
		});
	});

	watch(
		() => [props.appearance, props.localization],
		() => {
			if (clerk) {
				// @ts-expect-error: Internal unexposed Clerk property
				clerk.__unstable__updateProps({
					options: {
						localization: props.localization
					},
					appearance: props.appearance
				});
			}
		}
	);

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

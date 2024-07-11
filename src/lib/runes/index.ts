import { clerkContext } from '$lib/utils/context.js';

/**
 * A Svelte rune that is populated after clerk-js is instanciated.
 * The store returns the Clerk instance or `null`.
 *
 * @example
 * A simple example:
 *
 * $effect(() => console.log(clerk.current.publishableKey))
 */
export const clerk = {
	get current() {
		return clerkContext.get().clerk;
	}
};

/**
 * A Svelte rune that is prepopulated with the authentication context during SSR.
 *
 * @example
 * A simple example:
 *
 * $effect(() => console.log(auth.current.userId))
 */
export const auth = {
	get current() {
		return clerkContext.get().auth;
	}
};

/**
 * A Svelte rune that is populated after clerk-js has loaded.
 * The rune returns back the authenticated user or `null`.
 *
 * @example
 * A simple example:
 *
 * $effect(() => console.log(user.current.id))
 */
export const user = {
	get current() {
		return clerkContext.get().user;
	}
};

/**
 * A Svelte rune that is populated after clerk-js has loaded.
 * The rune returns the active organization of the authenticated user or `null`.
 *
 * @example
 * A simple example:
 *
 * $effect(() => console.log(organization.current.id))
 */
export const organization = {
	get current() {
		return clerkContext.get().organization;
	}
};

/**
 * A Svelte rune that is populated after clerk-js has loaded.
 * The store returns the session of the authenticated user or `null`.
 *
 * @example
 * A simple example:
 *
 * $effect(() => console.log(session.current.id))
 */
export const session = {
	get current() {
		return clerkContext.get().session;
	}
};

export const sessionList = {
	get current() {
		return clerkContext.get().client?.sessions;
	}
};

/**
 * A Svelte rune that is populated after clerk-js has loaded.
 * The rune returns the clerk client or `null`.
 *
 * @example
 * A simple example:
 *
 * $effect(() => console.log(client.current.activeSessions))
 */
export const client = {
	get current() {
		return clerkContext.get().client;
	}
};

/**
 * A Svelte rune that is populated after clerk-js has loaded.
 * The rune returns a `SignInResource` or `null`.
 *
 * @example
 * A simple example:
 *
 * $effect(() => console.log(signIn.current.status))
 */
export const signIn = {
	get current() {
		return clerkContext.get().client?.signIn;
	}
};

/**
 * A Svelte rune that is populated after clerk-js has loaded.
 * The rune returns a `SignUpResource` or `null`.
 *
 * @example
 * A simple example:
 *
 * $effect(() => console.log(signUp.current.status))
 */
export const signUp = {
	get current() {
		return clerkContext.get().client?.signUp;
	}
};

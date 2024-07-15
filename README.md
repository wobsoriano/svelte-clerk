# Svelte Clerk

Community package that integrates [Clerk](https://clerk.com/) with [SvelteKit](https://kit.svelte.dev/).

> [!IMPORTANT]
> This package requires Svelte 5 and was made to take advantage of [`runes`](https://svelte-5-preview.vercel.app/docs/runes) and [`snippets`](https://svelte-5-preview.vercel.app/docs/snippets). If you're using Svelte 4, please refer to [clerk-sveltekit](https://github.com/markjaquith/clerk-sveltekit). A PR is currently in draft to upgrade the clerk-sveltekit package to [Core 2](https://github.com/markjaquith/clerk-sveltekit/pull/60). It will implement the same concept as this package but will continue to use stores. When clerk-sveltekit upgrades to Svelte 5, this package will most likely get deprecated. So use this package at your own risk.

## Installation

```bash
npm install svelte-clerk
```

## Set environment variables

```bash
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxx
```

## Add server handler

```ts
import { withClerkHandler } from 'svelte-clerk/server';

export const handle = withClerkHandler();
```

## Update `app.d.ts`

Inside your `src/` directory, update the `app.d.ts` file to ensure that the locals added by the Clerk handler are properly typed.

```ts
/// <reference types="svelte-clerk/env" />

declare global {
	namespace App {...}
}
```

This handler will inject the [Auth](https://clerk.com/docs/references/nextjs/auth-object) object to `event.locals`.

## Add `<ClerkProvider>` to your root layout

All Clerk runes and components must be children of the `<ClerkProvider>` component, which provides active session and user context.

```ts
// src/+layout.server.ts
import { buildClerkInitialState } from 'svelte-clerk/server';

// To enable Clerk SSR support, pass the `initialState` to the `ClerkProvider` component.
export const load = ({ locals }) => {
	return {
		initialState: buildClerkInitialState(locals.auth)
	};
};
```

```svelte
<script lang="ts">
	import type { Snippet } from '@svelte';
	import type { LayoutData } from './$types';
	import { ClerkProvider } from 'svelte-clerk';
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

	const {
		children,
		data
	}: {
		children: Snippet;
		data: LayoutData;
	} = $props();
</script>

<!-- ... -->

<ClerkProvider initialState={data.initialState} publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
	{@render children()}
</ClerkProvider>
```

## Components

- `<ClerkLoaded>`
- `<ClerkLoading>`
- `<Protect>`
- `<SignedIn>`
- `<SignedOut>`
- `<SignIn>`
- `<SignUp>`
- `<UserButton>`
- `<UserProfile>`
- `<OrganizationProfile>`
- `<OrganizationSwitcher>`
- `<CreateOrganization>`

## Runes

- `auth` - Auth state.
- `user` - Authenticated [user](https://clerk.com/docs/references/javascript/user/user).
- `organization` - Active [Organization](https://clerk.com/docs/references/javascript/organization/organization) of the authenticated user.
- `session` - [Session](https://clerk.com/docs/references/javascript/session) of the authenticated user.
- `sessionList` - [Sessions](https://clerk.com/docs/references/javascript/session) of the current Clerk client.
- `signIn` - See [`SignIn`](https://clerk.com/docs/references/javascript/sign-in/sign-in).
- `signUp` - See [`SignUp`](https://clerk.com/docs/references/javascript/sign-up/sign-up).
- `clerk` - See [`Clerk`](https://clerk.com/docs/references/javascript/clerk/clerk).

Example:

The following example demonstrates how to use the `auth` rune to access the current auth state, like whether the user is signed in or not. It also demonstrates a basic example of how you could use the [`getToken()`](https://clerk.com/docs/pr/1259/references/javascript/session#get-token) method to retrieve a session token for fetching data from an external resource.

```svelte
<script>
	import { useClerkContext } from 'svelte-clerk';

	const ctx = useClerkContext();
	const userId = $derived(ctx.auth.userId);

	const fetchDataFromExternalResource = async () => {
		const token = await ctx.session.getToken();
		// Add logic to fetch your data
		return data;
	};
</script>

{#if userId === undefined}
	<p>Loading...</p>
{:else if userId === null}
	<p>Sign in to view this page</p>
{:else}
	<div>...</div>
{/if}
```

## Protecting routes

### Client side

Clerk offers Control Components that allow you to protect your pages. These components are used to control the visibility of your pages based on the user's authentication state.

```svelte
<script>
	import { SignedIn, SignedOut, UserButton, SignOutButton } from 'svelte-clerk';
</script>

<div>
	<h1>Index Route</h1>
	<SignedIn>
		<p>You are signed in!</p>
		<div>
			<p>View your profile here 👇</p>
			<UserButton />
		</div>
		<div>
			<SignOutButton />
		</div>
	</SignedIn>
	<SignedOut>
		<p>You are signed out</p>
		<div>
			<a href="/sign-in">Go to Sign in</a>
		</div>
		<div>
			<a href="/sign-up">Go to Sign up</a>
		</div>
	</SignedOut>
</div>
```

### Server side

To protect your routes, you can use the load function to check for the `userId` singleton. If it doesn't exist, redirect your user back to the sign-in page.

```ts
import { redirect } from '@sveltejs/kit';
import { clerkClient } from 'svelte-clerk/server';

export const load = ({ locals }) => {
	if (!locals.auth.userId) {
		return redirect(307, '/sign-in');
	}

	const user = await clerkClient.users.getUser(userId);

	return {
		userId: JSON.parse(JSON.stringify(locals.auth))
	};
};
```

#### Advanced usage

This example uses a custom `Security` class to handle the authorization logic. It is a good practice if you find yourself repeating the same logic across multiple routes.

In a utility file create a class that can provide multiple authorization methods which will trigger an appropriate http response in the event of a failed check:

```ts
// utils/Security.ts
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { withClerkHandler } from 'svelte-clerk/server';
import type { AuthObject } from '@clerk/backend/internal';

export class Security {
	private readonly auth?: AuthObject;

	constructor(private readonly event: RequestEvent) {
		this.auth = event.locals.auth;
	}

	isAuthenticated() {
		if (!this.auth?.userId) {
			redirect(307, '/sign-in');
		}
		return this;
	}

	hasPermission(permission: string) {
		const permitted = this.auth?.has({ permission });
		if (!permitted) {
			error(403, 'missing permission: ' + permission);
		}
		return this;
	}
}
```

Inject the `Security` class into the event locals so that it can be accessed in the load function:

```ts
// hooks.server.ts
import { sequence } from '@sveltejs/kit/hooks';
import { Security } from '$lib/utils';

export const handle = sequence(withClerkHandler(), ({ event, resolve }) => {
	event.locals.security = new Security(event);

	return resolve(event);
});
```

And use it in your routes:

```ts
// src/routes/admin/+page.server.ts

export const load = ({ locals: { securty, auth } }) => {
	// Restrict route to users with specific permissions
	security.hasPermission('org:sys_memberships:manage').hasPermission('org:sys_domains_manage');

	const project = await getProject(auth.userId);

	return { project };
};
```

If you're planning to add authorization logic within a `+layout.server.ts`, I recommend reading [this blog post](https://www.captaincodeman.com/securing-your-sveltekit-app) first.

## License

MIT

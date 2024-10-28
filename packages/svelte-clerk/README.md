# Svelte Clerk

Community package that integrates [Clerk](https://clerk.com/) with [SvelteKit](https://kit.svelte.dev/).

> [!IMPORTANT]
> This package requires Svelte 5 and uses [`runes`](https://svelte-5-preview.vercel.app/docs/runes) and [`snippets`](https://svelte-5-preview.vercel.app/docs/snippets) under the hood. If you're using Svelte 4, please refer to [clerk-sveltekit](https://github.com/markjaquith/clerk-sveltekit).

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
import { buildClerkProps } from 'svelte-clerk/server';

// To enable Clerk SSR support, pass the `initialState` to the `ClerkProvider` component.
export const load = ({ locals }) => {
	return {
		...buildClerkProps(locals.auth)
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

<ClerkProvider {...data} publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
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
- `<GoogleOneTap>`

## Runes

- `auth` - [Auth](https://clerk.com/docs/references/nextjs/auth-object#auth-object) object.
- `user` - Authenticated [user](https://clerk.com/docs/references/javascript/user/user).
- `organization` - Active [Organization](https://clerk.com/docs/references/javascript/organization/organization) of the authenticated user.
- `session` - [Session](https://clerk.com/docs/references/javascript/session) of the authenticated user.
- `clerk` - [`Clerk`](https://clerk.com/docs/references/javascript/clerk/clerk) object.

Example:

The following example demonstrates how to use the `auth` rune to access the current auth state, like whether the user is signed in or not. It also demonstrates a basic example of how you could use the [`getToken()`](https://clerk.com/docs/references/javascript/session#get-token) method to retrieve a session token for fetching data from an external resource.

```svelte
<script>
	import { useClerkContext } from 'svelte-clerk';

	// Do not destructure context or you'll lose reactivity!
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
	const { userId } = locals.auth;

	if (!userId) {
		return redirect(307, '/sign-in');
	}

	const user = await clerkClient.users.getUser(userId);

	return {
		user: JSON.parse(JSON.stringify(user))
	};
};
```

> [!NOTE]
> If you're planning to add authorization logic within a `+layout.server.ts` file, I recommend reading [this blog post](https://www.captaincodeman.com/securing-your-sveltekit-app) first.

## License

MIT
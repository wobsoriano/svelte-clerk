# Read session and user data in your Svelte app with Clerk

Svelte Clerk provides helpers to access the session and user data in your Svelte application.

## Client-side

In the following example, we check if the `userId` if `undefined` to determine if Clerk has finished initializing, if it's `null` to determine if the user is signed out, and if it's a string to determine if the user is signed in.

```svelte
<script lang="ts">
	import { useClerkContext } from 'svelte-clerk/client';

	// Do not destructure context to avoid losing reactivity
	const ctx = useClerkContext();

	const userId = $derived(ctx.auth.userId);
</script>

{#if isLoading}
	<p>Loading...</p>
{:else if userId === null}
	<p>Sign in to view this page</p>
{:else}
	<div>Hello, {userId}!</div>
{/if}
```

## Server-side

The `Auth` object is available at `event.locals.auth()` in your server [loaders and actions](https://svelte.dev/docs/kit/load). This object contains important information like the current user's session ID, user ID, and organization ID. The `userId` can be used to protect your routes.

In some cases, you may need the full [`Backend User`](https://clerk.com/docs/references/backend/types/backend-user) object of the currently active user. This is helpful if you want to render information, like their first and last name, directly from the server. The `clerkClient()` helper returns an instance of the [JavaScript Backend SDK](https://clerk.com/docs/references/backend/overview), which exposes Clerk's Backend API resources through methods such as the [`getUser()`](https://clerk.com/docs/references/backend/user/get-user) method. This method returns the full `Backend User` object.

In the following example, the `userId` is passed to the Backend SDK's `getUser()` method to get the user's full `Backend User` object.

```ts
import { redirect } from '@sveltejs/kit';
import { clerkClient } from 'svelte-clerk/server';

export const load = async ({ locals }) => {
	const { userId } = locals.auth();

	// Protect the route by checking if the user is signed in
	if (!userId) {
		return redirect(307, '/sign-in');
	}

	// Get the user's full `Backend User` object
	const user = await clerkClient.users.getUser(userId);

	return {
		user: JSON.parse(JSON.stringify(user))
	};
};
```

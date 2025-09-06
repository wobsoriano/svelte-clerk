# Client-side Helpers

### `useClerkContext()`

The Svelte SDK provides a `useClerkContext()` function that gives you access to the [`Clerk`](https://clerk.com/docs/references/javascript/clerk) object, [`User`](https://clerk.com/docs/references/javascript/user) object, [`Organization`](https://clerk.com/docs/references/javascript/organization) object, and a set of useful helper methods for signing in and signing up. They all leverage the power of [Svelte Runes](https://svelte.dev/blog/runes).

The `useClerkContext()` function returns the following properties:

- `auth` - Access to the current user's authentication state and methods to manage the active session.
- `user` - The `User` object.
- `organization` - The `Organization` object.
- `session` - The [`Session`](https://clerk.com/docs/references/javascript/session) object.
- `clerk` - The [`Clerk`](https://clerk.com/docs/references/javascript/clerk/clerk) object.

The following example demonstrates how to use the `auth` object to access the current auth state, like whether the user is signed in or not. It also demonstrates a basic example of how you could use the [`getToken()`](https://clerk.com/docs/references/javascript/session#get-token) method to retrieve a session token for fetching data from an external resource.

```svelte
<script lang="ts">
	import { useClerkContext } from 'svelte-clerk/client';

	// Do not destructure context to avoid losing reactivity
	const ctx = useClerkContext();

	const userId = $derived(ctx.auth.userId);

	const fetchDataFromExternalResource = async () => {
		const token = await ctx.session.getToken();
		const response = await fetch('https://api.example.com/data', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.json();
	};
</script>

{#if userId === undefined}
	<p>Loading...</p>
{:else if userId === null}
	<p>Sign in to view this page</p>
{:else}
	<div>User ID: {userId}</div>
{/if}
```

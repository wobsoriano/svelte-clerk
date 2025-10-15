# Server-side Helpers

## `withClerkHandler()`

The `withClerkHandler()` helper integrates Clerk authentication and authorization into your SvelteKit application through hooks.

It accepts an optional [options object](https://clerk.com/docs/references/backend/authenticate-request#authenticate-request-options), though it is recommended to pass these options as [environment variables](https://clerk.com/docs/deployments/clerk-environment-variables#api-and-sdk-configuration).

```ts
import { withClerkHandler } from 'svelte-clerk/server';

export const handle = withClerkHandler();
```

## `clerkClient`

The `clerkClient` helper returns an instance of the [JavaScript Backend SDK](https://clerk.com/docs/references/backend/overview).

The following example demonstrates how you can use the `auth()` local to get the user's ID, and then use the Backend SDK's [`getUser()`](https://clerk.com/docs/references/backend/user/get-user) method to get the [Backend User object](https://clerk.com/docs/references/backend/types/backend-user).

```ts
import { redirect } from '@sveltejs/kit';
import { clerkClient } from 'svelte-clerk/server';

export const load = async ({ locals }) => {
	// Use `auth()` local to get the user's ID
	const { userId } = locals.auth();

	// Protect the route by checking if the user is signed in
	if (!userId) {
		return redirect(307, '/sign-in');
	}

	// Use the Backend SDK's `getUser()` method to get the Backend User object
	const user = await clerkClient.users.getUser(userId);

	// Return the Backend User object
	return {
		user: JSON.parse(JSON.stringify(user))
	};
};
```

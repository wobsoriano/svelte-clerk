# Server-side Helpers

## `withClerkHandler()`

The `withClerkHandler()` helper integrates Clerk authentication and authorization into your SvelteKit application through hooks.

It accepts an optional [options object](https://clerk.com/docs/references/backend/authenticate-request#authenticate-request-options).

In **Node.js environments**, the SDK automatically reads `CLERK_SECRET_KEY` and `PUBLIC_CLERK_*` variables from `process.env` — no arguments needed:

```ts
// hooks.server.ts
import { withClerkHandler } from 'svelte-clerk/server';

export const handle = withClerkHandler();
```

For **Cloudflare Workers, static adapters, or other non-Node environments**, pass the options explicitly:

```ts
// hooks.server.ts
import { withClerkHandler } from 'svelte-clerk/server';

export const handle = withClerkHandler({
	secretKey: MY_SECRET_KEY,       // from platform.env or similar
	publishableKey: MY_PUBLISHABLE_KEY,
});
```

## `clerkClient`

The `clerkClient` helper returns an instance of the [JavaScript Backend SDK](https://clerk.com/docs/references/backend/overview).

The following example demonstrates how you can use the `auth()` local to get the user's ID, and then use the Backend SDK's [`getUser()`](https://clerk.com/docs/references/backend/user/get-user) method to get the [Backend User object](https://clerk.com/docs/references/backend/types/backend-user).

```ts
import { redirect } from '@sveltejs/kit';
import { clerkClient } from 'svelte-clerk/server';

export const load = async (event) => {
	const { locals } = event;

	// Use `auth()` local to get the user's ID
	const { userId } = locals.auth();

	// Protect the route by checking if the user is signed in
	if (!userId) {
		return redirect(307, '/sign-in');
	}

	// Use the Backend SDK's `getUser()` method to get the Backend User object
	const user = await clerkClient(event).users.getUser(userId);

	// Return the Backend User object
	return {
		user: JSON.parse(JSON.stringify(user))
	};
};
```

## `buildClerkProps()`

The `buildClerkProps()` helper is used to inform the client-side helpers of the authentication state of the user. This function is used for SSR in the root server load function of your SvelteKit application.

It accepts `locals` (or `event`), which allows it to automatically pass the Clerk configuration (like `publishableKey`) to the client.

```ts
import { buildClerkProps } from 'svelte-clerk/server';

export const load = async ({ locals }) => {
	return {
		...buildClerkProps(locals)
	};
};
```

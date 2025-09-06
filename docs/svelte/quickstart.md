---
outline: deep
---

# Svelte Quickstart

> [!IMPORTANT]
> This guide is for static apps only. For SSR apps, please refer to the [SvelteKit Quickstart](/kit/quickstart) guide.

### 1. Installation

The Svelte Clerk SDK gives you access to prebuilt components, runes, and helpers to make user authentication easier.

```sh
npm install svelte-clerk
```

### 2. Set your Clerk API keys

Add your Clerk Publishable Key to your .env file. This key can always be retrieved from the [API Keys](https://dashboard.clerk.com/last-active?path=api-keys) page in the Clerk Dashboard.

```sh
PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxx
```

### 3. Add `<ClerkProvider>` to your root layout

All Clerk runes and components must be children of the `<ClerkProvider>` component, which provides active session and user context.

```svelte
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ClerkProvider } from 'svelte-clerk/client';
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

	const { children }: { children: Snippet } = $props();
</script>

<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
	{@render children()}
</ClerkProvider>
```

### 4. Create a header with Clerk components

You can control which content signed-in and signed-out users can see with Clerk's [prebuilt control components](https://clerk.com/docs/components/overview#control-components).

```svelte
<script lang="ts">
	import { SignedIn, SignedOut, SignInButton, UserButton } from 'svelte-clerk/client';
</script>

<template>
	<header>
		<SignedOut>
			<SignInButton />
		</SignedOut>
		<SignedIn>
			<UserButton />
		</SignedIn>
	</header>
</template>
```

### 5. Create your first user

Run your project with the following command:

```sh
npm run dev
```

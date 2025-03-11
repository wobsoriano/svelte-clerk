---
'svelte-clerk': minor
---

Add support for static SvelteKit adapter.

Usage:

```svelte
<script lang="ts">
	import type { Snippet } from '@svelte';
	import {
		ClerkProvider,
		SignedIn,
		SignedOut,
		UserButton,
		SignInButton
	} from 'svelte-clerk/client'; // import from /client
</script>

<ClerkProvider>
	<SignedIn>
		<UserButton />
		<p>Welcome back!</p>
	</SignedIn>
	<SignedOut>
		<SignInButton mode="modal" />
	</SignedOut>
</ClerkProvider>
```

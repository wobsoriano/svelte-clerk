---
'svelte-clerk': minor
---

Add support for static SvelteKit adapter.

Usage:

```svelte
<script lang="ts">
	import type { Snippet } from '@svelte';
	import { ClerkProvider } from 'svelte-clerk/client'; // import from /client

	const { children }: { children: Snippet } = $props();
</script>

<!-- ... -->

<ClerkProvider>
	{@render children()}
</ClerkProvider>
```

---
'svelte-clerk': minor
---

Add `currentUser` helper function.

Usage:

```ts
// src/+page.server.ts
export const load = async ({ locals }) => {
	const user = await locals.currentUser();

	return {
		user
	};
};
```

---
'svelte-clerk': minor
---

Add [
`<RedirectToSignIn />`](https://clerk.com/docs/components/control/redirect-to-signin) and
[`<RedirectToSignUp />`](https://clerk.com/docs/components/control/redirect-to-signup)
control components.

Usage:

```svelte
<script>
	import { RedirectToSignIn, SignedIn, SignedOut } from 'svelte-clerk';
</script>

<SignedIn>
	<div>Signed in</div>
</SignedIn>
<SignedOut>
	<RedirectToSignIn />
</SignedOut>
```

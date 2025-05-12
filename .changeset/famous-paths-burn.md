---
'svelte-clerk': patch
---

Allow custom buttons for unstyled components using the `asChild` prop.

Example:

```html
<script>
import { SignInButton } from 'svelte-clerk'
</script>

<SignInButton asChild>
  <button>Custom sign in button</button>
</SignInButton>
```

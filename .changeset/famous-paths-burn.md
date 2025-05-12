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
  {#snippet children({ signIn })}
      <button onclick={signIn}>Custom sign in button</button>
  {/snippet}
</SignInButton>
```

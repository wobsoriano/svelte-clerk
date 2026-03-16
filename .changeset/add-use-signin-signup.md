---
"svelte-clerk": minor
---

Added `useSignIn()` and `useSignUp()` hooks for building custom authentication flows.

```svelte
<script lang="ts">
  import { useSignIn } from 'svelte-clerk/client';

  const { signIn, errors, fetchStatus } = useSignIn();
</script>
```

```svelte
<script lang="ts">
  import { useSignUp } from 'svelte-clerk/client';

  const { signUp, errors, fetchStatus } = useSignUp();
</script>
```

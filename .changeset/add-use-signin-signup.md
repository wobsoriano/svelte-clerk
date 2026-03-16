---
"svelte-clerk": minor
---

Added `useSignIn()` and `useSignUp()` hooks for building custom authentication flows.

```svelte
<script lang="ts">
  import { useSignIn } from 'svelte-clerk/client';

  const signInState = useSignIn();
  // signInState.signIn, signInState.errors, signInState.fetchStatus
</script>
```

```svelte
<script lang="ts">
  import { useSignUp } from 'svelte-clerk/client';

  const signUpState = useSignUp();
  // signUpState.signUp, signUpState.errors, signUpState.fetchStatus
</script>
```

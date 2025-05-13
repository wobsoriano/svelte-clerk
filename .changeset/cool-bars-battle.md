---
'svelte-clerk': patch
---

Add `feature` and `plan` prop to `<Protect>` component.

Usage:

Plan

```svelte
<Protect plan="my-plan" />
```

Feature

```svelte
<Protect feature="my-feature" />
```

Scoped per user or per org

```svelte
<Protect feature="org:my-feature" />
<Protect feature="user:my-feature" />
<Protect plan="org:my-plan" />
<Protect plan="user:my-plan" />
```

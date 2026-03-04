# Namespace Clerk Data Under `page.data.__clerk` Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor `buildClerkProps` to return `{ __clerk: ClerkPageData }` instead of flat keys, enabling the root `ClerkProvider.svelte` to use a clean `...props` spread without listing every Clerk option explicitly.

**Architecture:** `buildClerkProps` wraps all public Clerk config (auth state + public options) under a single `__clerk` key. The library augments `App.PageData` automatically so users get TypeScript support for free. The root `ClerkProvider.svelte` merges `page.data.__clerk` as defaults, letting user-passed props always win.

**Tech Stack:** SvelteKit, Svelte 5, TypeScript, `@clerk/backend`, `@clerk/shared`

---

### Task 1: Add `ClerkPageData` type and export it

**Files:**
- Modify: `src/lib/server/types.ts`
- Modify: `src/lib/server/index.ts`

**Step 1: Add `ClerkPageData` to `src/lib/server/types.ts`**

Replace the entire file content with:

```ts
import type { AuthenticateRequestOptions } from '@clerk/backend/internal';
import type { InitialState } from '@clerk/shared/types';

export type ClerkSvelteKitMiddlewareOptions = AuthenticateRequestOptions & {
  debug?: boolean;
  telemetry?: {
    disabled?: boolean;
    debug?: boolean;
  };
};

export type ClerkPageData = {
  initialState?: InitialState;
  publishableKey?: string;
  signInUrl?: string;
  signUpUrl?: string;
  signInForceRedirectUrl?: string;
  signUpForceRedirectUrl?: string;
  signInFallbackRedirectUrl?: string;
  signUpFallbackRedirectUrl?: string;
  proxyUrl?: string;
  domain?: string;
  isSatellite?: boolean;
  telemetry?: {
    disabled?: boolean;
    debug?: boolean;
  };
};
```

**Step 2: Export `ClerkPageData` from `src/lib/server/index.ts`**

Change:
```ts
export { withClerkHandler, type ClerkSvelteKitMiddlewareOptions } from './withClerkHandler.js';
```
To:
```ts
export { withClerkHandler, type ClerkSvelteKitMiddlewareOptions } from './withClerkHandler.js';
export type { ClerkPageData } from './types.js';
```

**Step 3: Run type check**

```bash
npm run check
```
Expected: 0 errors, 0 warnings.

**Step 4: Commit**

```bash
git add src/lib/server/types.ts src/lib/server/index.ts
git commit -m "feat: add ClerkPageData type"
```

---

### Task 2: Augment `App.PageData` in the library's type declarations

**Files:**
- Modify: `src/lib/env.d.ts`

**Step 1: Add `App.PageData` augmentation**

Replace the file content with:

```ts
import type { SessionAuthObject } from '@clerk/backend';
import type { PendingSessionOptions } from '@clerk/shared/types';
import type { ClerkPageData } from './server/types.js';

declare global {
  namespace App {
    interface Locals {
      auth: (options?: PendingSessionOptions) => SessionAuthObject;
      __internal_clerk_config: Record<string, unknown>;
    }
    interface PageData {
      __clerk?: ClerkPageData;
    }
  }
}
```

**Step 2: Run type check**

```bash
npm run check
```
Expected: 0 errors, 0 warnings.

**Step 3: Commit**

```bash
git add src/lib/env.d.ts
git commit -m "feat: augment App.PageData with __clerk"
```

---

### Task 3: Update `buildClerkProps` to return `{ __clerk: ClerkPageData }`

**Files:**
- Modify: `src/lib/server/buildClerkProps.ts`

**Step 1: Rewrite `buildClerkProps`**

Replace the entire file with:

```ts
import { makeAuthObjectSerializable, stripPrivateDataFromObject } from '@clerk/backend/internal';
import type { AuthObject } from '@clerk/backend';
import type { RequestEvent } from '@sveltejs/kit';
import type { ClerkPageData } from './types.js';

/**
 * To enable Clerk SSR support, include this object in the props returned from your
 * layout's `load` function. This makes auth state and public config available to
 * `ClerkProvider` during SSR, hydration, and CSR.
 *
 * @example
 * ```ts
 * // src/routes/+layout.server.ts
 * import { buildClerkProps } from 'svelte-clerk/server';
 *
 * export const load = ({ locals }) => {
 *   return {
 *     ...buildClerkProps(locals),
 *   };
 * };
 * ```
 */
export function buildClerkProps(
  localsOrEventOrAuth: App.Locals | RequestEvent | AuthObject,
): { __clerk: ClerkPageData } {
  let auth: AuthObject;
  let localsConfig: Record<string, any> = {};

  if ('locals' in localsOrEventOrAuth) {
    // RequestEvent
    auth = localsOrEventOrAuth.locals.auth();
    localsConfig = localsOrEventOrAuth.locals.__internal_clerk_config as Record<string, any>;
  } else if ('auth' in localsOrEventOrAuth && typeof localsOrEventOrAuth.auth === 'function') {
    // App.Locals
    auth = (localsOrEventOrAuth as App.Locals).auth();
    localsConfig = (localsOrEventOrAuth as App.Locals).__internal_clerk_config as Record<string, any>;
  } else {
    // AuthObject (no config available)
    auth = localsOrEventOrAuth as AuthObject;
  }

  const initialState = JSON.parse(
    JSON.stringify(makeAuthObjectSerializable(stripPrivateDataFromObject(auth))),
  );

  const __clerk: ClerkPageData = {
    initialState,
    publishableKey: localsConfig.publishableKey as string | undefined,
    signInUrl: localsConfig.signInUrl as string | undefined,
    signUpUrl: localsConfig.signUpUrl as string | undefined,
    signInForceRedirectUrl: localsConfig.signInForceRedirectUrl as string | undefined,
    signUpForceRedirectUrl: localsConfig.signUpForceRedirectUrl as string | undefined,
    signInFallbackRedirectUrl: localsConfig.signInFallbackRedirectUrl as string | undefined,
    signUpFallbackRedirectUrl: localsConfig.signUpFallbackRedirectUrl as string | undefined,
    proxyUrl: localsConfig.proxyUrl as string | undefined,
    domain: localsConfig.domain as string | undefined,
    isSatellite: localsConfig.isSatellite as boolean | undefined,
    telemetry: localsConfig.telemetry as ClerkPageData['telemetry'],
  };

  return { __clerk };
}
```

**Step 2: Run type check**

```bash
npm run check
```
Expected: 0 errors, 0 warnings.

**Step 3: Commit**

```bash
git add src/lib/server/buildClerkProps.ts
git commit -m "feat: buildClerkProps returns { __clerk: ClerkPageData }"
```

---

### Task 4: Simplify the root `ClerkProvider.svelte`

**Files:**
- Modify: `src/lib/ClerkProvider.svelte`

**Step 1: Replace entire file**

```svelte
<script lang="ts">
  import ClerkProvider from '$lib/client/ClerkProvider.svelte';
  import type { ClerkProviderProps } from '$lib/types.js';
  import { page } from '$app/state';
  import { goto, pushState, replaceState } from '$app/navigation';

  const {
    children,
    ...props
  }: Omit<ClerkProviderProps, 'routerPush' | 'routerReplace' | 'publishableKey'> & {
    publishableKey?: string;
  } = $props();

  const merged = $derived({
    ...(page?.data?.__clerk ?? {}),
    ...props,
  });

  type RouterMetadata = { __internal_metadata?: { navigationType?: 'internal' | 'external' | 'window' } };

  const routerPush = (to: string, metadata?: RouterMetadata) => {
    if (metadata?.__internal_metadata?.navigationType === 'internal') {
      pushState(to, {});
    } else {
      goto(to);
    }
  };

  const routerReplace = (to: string, metadata?: RouterMetadata) => {
    if (metadata?.__internal_metadata?.navigationType === 'internal') {
      replaceState(to, {});
    } else {
      goto(to, { replaceState: true });
    }
  };
</script>

<ClerkProvider
  {...(merged as any)}
  {routerPush}
  {routerReplace}
>
  {@render children?.()}
</ClerkProvider>
```

**Step 2: Run type check**

```bash
npm run check
```
Expected: 0 errors, 0 warnings.

**Step 3: Commit**

```bash
git add src/lib/ClerkProvider.svelte
git commit -m "feat: simplify root ClerkProvider using page.data.__clerk spread"
```

---

### Task 5: Update the demo app's `+layout.server.ts` (already correct — verify only)

**Files:**
- Read: `src/routes/+layout.server.ts`

The existing code is:
```ts
export const load = ({ locals }) => {
  return {
    ...buildClerkProps(locals)
  };
};
```

With the new return shape `{ __clerk: ClerkPageData }`, spreading it means `page.data.__clerk` will be set automatically. **No changes needed.**

**Step 1: Run type check to confirm**

```bash
npm run check
```
Expected: 0 errors, 0 warnings.

---

### Task 6: Update documentation

**Files:**
- Modify: `docs/kit/helpers.md`
- Modify: `docs/kit/quickstart.md`

**Step 1: Update any references to flat `page.data` Clerk keys**

Search for references like `page.data.publishableKey`, `page.data.initialState`, `page.data.signInUrl` etc. and update to note these are now nested under `page.data.__clerk` (though users typically never access them directly — they're consumed automatically by `ClerkProvider`).

Run:
```bash
grep -r "page\.data\." docs/kit/ --include="*.md"
```

Update any code examples that reference flat Clerk keys in `page.data`.

**Step 2: Update `buildClerkProps` examples if needed**

Ensure the JSDoc example in `buildClerkProps.ts` and any docs show the correct spread pattern:
```ts
return {
  ...buildClerkProps(locals), // now spreads { __clerk: { ... } }
};
```

**Step 3: Commit**

```bash
git add docs/
git commit -m "docs: update helpers and quickstart for __clerk namespace"
```

---

### Task 7: Final validation

**Step 1: Full type check**

```bash
npm run check
```
Expected: 0 errors, 0 warnings.

**Step 2: Build**

```bash
npm run build
```
Expected: no errors.

**Step 3: Commit if any fixes were needed, otherwise done**

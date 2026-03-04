# Design: Namespace Clerk Data in `page.data.__clerk`

## Problem

The current `buildClerkProps` spreads Clerk configuration as flat keys into `page.data`
(e.g. `page.data.publishableKey`, `page.data.signInUrl`). This forces the root
`ClerkProvider.svelte` to explicitly destructure and re-forward every prop individually,
making it brittle — adding a new Clerk option requires editing both `buildClerkProps`
and `ClerkProvider.svelte`.

## Goals

- Root `ClerkProvider.svelte` uses `...props` cleanly, no key listing
- All public Clerk options (including satellite: `domain`, `proxyUrl`, `isSatellite`) flow correctly server → client
- Library auto-augments `App.PageData` so users need no boilerplate
- `withClerkHandler` remains the single source of truth for server config
- Clean break (unreleased work, no migration path needed)

## Design

### Data Flow

```
process.env (Node) or withClerkHandler options (Edge/Static)
  → withClerkHandler → event.locals.__internal_clerk_config
  → buildClerkProps(locals) → { __clerk: ClerkPageData }
  → page.data.__clerk
  → Root ClerkProvider: { ...(page.data.__clerk ?? {}), ...userProps }
  → Inner client/ClerkProvider: { ...props } → clerk.load(props)
```

### `ClerkPageData` Type

New exported type from `svelte-clerk/server`:

```ts
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
  telemetry?: { disabled?: boolean; debug?: boolean };
};
```

### `buildClerkProps` — returns `{ __clerk: ClerkPageData }`

Wraps all public config (including `initialState`) under the `__clerk` key.
No longer returns flat keys.

### `App.PageData` Augmentation

Added to `src/lib/env.d.ts` (alongside existing `App.Locals` augmentation):

```ts
interface PageData {
  __clerk?: import('./server/index.js').ClerkPageData;
}
```

Users get full TypeScript support for `page.data.__clerk` without any setup.

### Root `ClerkProvider.svelte`

Becomes minimal — no prop listing:

```svelte
<script>
  const { children, ...props } = $props();
  const merged = $derived({ ...(page?.data?.__clerk ?? {}), ...props });
</script>

<ClerkProvider {...merged} {routerPush} {routerReplace}>
  {@render children?.()}
</ClerkProvider>
```

User-passed props always override server-side data. `routerPush`/`routerReplace` are always injected.

### `withClerkHandler` — no structural change

- Reads `process.env` as base in Node environments
- Passed `middlewareOptions` override env values
- Satellite validation unchanged: throws if `isSatellite=true` without `domain` or `proxyUrl`
- Stores full config in `event.locals.__internal_clerk_config`

### Satellite Domain Support

Satellite props (`proxyUrl`, `domain`, `isSatellite`, `signInUrl`) are validated server-side
in `withClerkHandler`, stored in `locals`, included in `__clerk` by `buildClerkProps`,
and spread through to `clerk.load()` via the inner provider. No special handling needed.

## Files Changed

- `src/lib/server/buildClerkProps.ts` — return `{ __clerk: ClerkPageData }` instead of flat keys
- `src/lib/server/types.ts` — add `ClerkPageData` export
- `src/lib/server/index.ts` — export `ClerkPageData`
- `src/lib/ClerkProvider.svelte` — replace explicit prop list with spread merge
- `src/lib/env.d.ts` — augment `App.PageData` with `__clerk`

## Out of Scope

- `__internal_clerkJSUrl` / `__internal_clerkJSVersion` — passed directly as props to `<ClerkProvider>` if needed; not server-injected
- SPA (client-only) mode — `publishableKey` is still required as a prop in that case

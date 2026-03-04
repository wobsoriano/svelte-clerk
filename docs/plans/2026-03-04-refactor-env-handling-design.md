# Refactor Environment Variable Handling Design

## Overview
This document outlines the design for refactoring environment variable handling in `svelte-clerk`. The goal is to remove the hard dependency on SvelteKit's `$env/dynamic` imports, enabling support for static adapters and custom environments (e.g. Cloudflare Workers) where dynamic environment variables might not be available or behave differently.

## Problem
Currently, the library imports `$env/dynamic/public` and `$env/dynamic/private` directly in `src/lib/server/constants.ts` and utility files. This forces the use of dynamic environment variables, which breaks when using `adapter-static` or other adapters that require build-time configuration or have different environment handling mechanisms.

## Solution

### 1. Remove Direct `$env` Imports
Remove all imports of `$env/dynamic/public` and `$env/dynamic/private` from the library's source code (`src/lib`).

### 2. Singleton Configuration Store
Create a new module `src/lib/server/config.ts` (or similar) to hold the configuration state. This store will contain the API keys and other options passed by the user.

```typescript
// src/lib/server/config.ts
let config: ClerkConfig | null = null;

export function configureClerk(options: ClerkConfig) {
  config = options;
}

export function getConfig() {
  if (!config) {
    throw new Error('Clerk is not configured. Please call configureClerk() or use withClerkHandler() in hooks.server.ts.');
  }
  return config;
}
```

### 3. Lazy `clerkClient` Initialization (Proxy Pattern)
Modify `src/lib/server/clerkClient.ts` to export a `clerkClient` that is a Proxy or a lazy getter. This ensures that the client is only created *after* configuration is available (i.e., after `hooks.server.ts` runs).

```typescript
// src/lib/server/clerkClient.ts
import { createClerkClient } from '@clerk/backend';
import { getConfig } from './config';

const clientProxy = new Proxy({}, {
  get(target, prop) {
    const config = getConfig();
    const client = createClerkClient({ ...config });
    return client[prop as keyof typeof client];
  }
});

export const clerkClient = clientProxy as ReturnType<typeof createClerkClient>;
```

### 4. Update `withClerkHandler`
Update `src/lib/server/withClerkHandler.ts` to accept configuration options and initialize the singleton store.

```typescript
// src/lib/server/withClerkHandler.ts
export function withClerkHandler(options: ClerkSvelteKitMiddlewareOptions) {
  configureClerk(options); // Initialize config
  return async ({ event, resolve }) => { ... };
}
```

### 5. Migration Guide
Users will need to update their `hooks.server.ts` to explicitly pass environment variables if they were relying on auto-import.

```typescript
// hooks.server.ts
import { withClerkHandler } from 'svelte-clerk/server';
import { env } from '$env/dynamic/private';

export const handle = withClerkHandler({
  secretKey: env.CLERK_SECRET_KEY,
  publishableKey: env.PUBLIC_CLERK_PUBLISHABLE_KEY,
});
```

## Alternatives Considered
- **Fallback to `process.env`**: Could attempt to read `process.env` for Node environments, but SvelteKit prefers `import.meta.env` or `$env` modules. Explicit configuration is more robust across adapters.
- **Separate Entry Points**: Having a `svelte-clerk/node` vs `svelte-clerk/static` entry point. This adds complexity and maintenance burden. The proposed solution works for all.

## Impact
- **Breaking Change**: Users must update `hooks.server.ts` to pass keys.
- **Benefits**: Support for static adapter, Cloudflare Workers, and custom environments. Cleaner architecture.

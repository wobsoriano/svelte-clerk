# Refactor Environment Variable Handling Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Refactor `svelte-clerk` to remove direct dependency on `$env/dynamic/*` and global state, enabling safer multi-tenant support and static adapter compatibility by passing configuration via request context (`event.locals`).

**Architecture:**
1. `withClerkHandler` accepts configuration (keys, options).
2. `withClerkHandler` stores this configuration in `event.locals.__internal_clerk_config`.
3. `clerkClient` becomes a function `clerkClient(event)` that retrieves config from context and returns an initialized client.
4. All direct `$env` imports are removed.

**Tech Stack:** Svelte 5, SvelteKit, TypeScript

---

### Task 1: Update Type Definitions

**Files:**
- Modify: `src/app.d.ts` (if it exists, or create/document needed changes)
- Modify: `src/lib/types.ts` (if needed for context typing)

**Step 1: Define context type**
Ensure `App.Locals` can hold `__internal_clerk_config`. Since `App.Locals` is user-defined, we'll cast `event.locals` as `any` internally or define an interface `ClerkLocals` that extends it.

**Step 2: Update types**
No specific file creation needed if we use internal casting, but let's document it in `src/lib/server/types.ts` if we have one.

### Task 2: Refactor constants.ts

**Files:**
- Modify: `src/lib/server/constants.ts`

**Step 1: Remove env imports and key exports**
Remove all imports of `$env/*` and `getDynamic*` functions.
Remove exports of `API_VERSION`, `PUBLISHABLE_KEY`, `API_URL`, `TELEMETRY_DISABLED`, `TELEMETRY_DEBUG`, `SECRET_KEY`, `JWT_KEY`.
Keep `Cookies` and `Headers` re-exports from `@clerk/backend/internal`.

**Step 2: Commit**
```bash
git add src/lib/server/constants.ts
git commit -m "refactor: remove env usage from constants"
```

### Task 3: Refactor withClerkHandler.ts

**Files:**
- Modify: `src/lib/server/withClerkHandler.ts`

**Step 1: Store config in locals**
1. Update `withClerkHandler` to accept `options`.
2. Inside the handle function, store `options` in `event.locals.__internal_clerk_config`.
3. Remove imports of `getDynamicPublicEnvVariables`.
4. Refactor `handleMultiDomainAndProxy` to use `options` instead of `getDynamicPublicEnvVariables()`.

**Step 2: Commit**
```bash
git add src/lib/server/withClerkHandler.ts
git commit -m "refactor: store clerk config in event.locals"
```

### Task 4: Refactor clerkClient.ts

**Files:**
- Modify: `src/lib/server/clerkClient.ts`

**Step 1: Change to function**
Refactor `clerkClient` to be a function that accepts `RequestEvent`.

```typescript
import { createClerkClient } from '@clerk/backend';
import type { RequestEvent } from '@sveltejs/kit';

// Cache client instances if possible, or create fresh
// For now, create fresh is safest to avoid stale config
export const clerkClient = (event: RequestEvent) => {
	const config = event.locals.__internal_clerk_config;
	if (!config) {
		throw new Error('Clerk is not configured. Ensure withClerkHandler is used in hooks.server.ts.');
	}
	return createClerkClient({
		secretKey: config.secretKey,
		publishableKey: config.publishableKey,
		apiUrl: config.apiUrl,
		apiVersion: config.apiVersion,
		jwtKey: config.jwtKey,
		proxyUrl: config.proxyUrl,
		domain: config.domain,
		isSatellite: config.isSatellite,
		telemetry: {
			disabled: config.telemetry?.disabled,
			debug: config.telemetry?.debug
		}
	});
};
```

**Step 2: Commit**
```bash
git add src/lib/server/clerkClient.ts
git commit -m "refactor: make clerkClient a function using event context"
```

### Task 5: Clean up Utility Files

**Files:**
- Delete: `src/lib/utils/getDynamicPublicEnvVariables.ts`
- Delete: `src/lib/utils/getDynamicPrivateEnvVariables.ts`
- Delete: `src/lib/utils/mergeWithPublicEnvVariables.ts`

**Step 1: Delete files**
Run `rm` for these files.

**Step 2: Commit**
```bash
git rm src/lib/utils/getDynamicPublicEnvVariables.ts src/lib/utils/getDynamicPrivateEnvVariables.ts src/lib/utils/mergeWithPublicEnvVariables.ts
git commit -m "refactor: remove unused env utility files"
```

### Task 6: Update ClerkProvider

**Files:**
- Modify: `src/lib/ClerkProvider.svelte`

**Step 1: Remove mergeWithPublicEnvVariables usage**
Remove the import and usage of `mergeWithPublicEnvVariables`.
Pass `props` directly to the underlying `ClerkProvider`.

**Step 2: Commit**
```bash
git add src/lib/ClerkProvider.svelte
git commit -m "refactor: update ClerkProvider to remove auto-env merging"
```

### Task 7: Verify Build

**Files:**
- Run: `npm run check`
- Run: `npm run build`

**Step 1: Run checks**
Verify that the removal of these files and constants didn't break other parts of the codebase.

**Step 2: Commit fixes (if any)**
If build fails, fix issues and commit.

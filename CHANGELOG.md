# svelte-clerk

## 0.10.5

### Patch Changes

- f270b83: Bump @clerk/backend from 1.25.5 to 1.25.6
- f270b83: Bump @clerk/shared from 3.2.0 to 3.2.1
- f270b83: Bump @clerk/types from 4.49.1 to 4.49.2

## 0.10.4

### Patch Changes

- 4564d76: Bump @clerk/backend from 1.25.2 to 1.25.5
- 4564d76: Bump @clerk/shared from 3.0.1 to 3.2.0
- 4564d76: Bump @clerk/types from 4.48.0 to 4.49.1

## 0.10.3

### Patch Changes

- 07a890c: Use `SignedInSessionResource` type for the session resource.

## 0.10.2

### Patch Changes

- 3a0c70c: Fix incorrect property name when updating Clerk UI props

## 0.10.1

### Patch Changes

- 9b4f02f: Bump @clerk/backend from 1.25.1 to 1.25.2
- 9b4f02f: Bump @clerk/shared from 3.0.0 to 3.0.1
- 9b4f02f: Bump @clerk/types from 4.47.0 to 4.48.0

## 0.10.0

### Minor Changes

- 5375f09: Add support for SvelteKit static adapter.

  Usage:

  ```svelte
  <script lang="ts">
  	import type { Snippet } from '@svelte';
  	import {
  		ClerkProvider,
  		SignedIn,
  		SignedOut,
  		UserButton,
  		SignInButton
  	} from 'svelte-clerk/client'; // import from /client
  </script>

  <ClerkProvider>
  	<SignedIn>
  		<UserButton />
  		<p>Welcome back!</p>
  	</SignedIn>
  	<SignedOut>
  		<SignInButton mode="modal" />
  	</SignedOut>
  </ClerkProvider>
  ```

## 0.9.0

### Minor Changes

- 6d990ca: Use dynamic env vars for proper runtime support

### Patch Changes

- f7d73d2: Bump @clerk/backend from 1.25.0 to 1.25.1 in the clerk-dependencies group

## 0.8.7

### Patch Changes

- 9c54ccd: Bump @clerk/backend from 1.24.3 to 1.25.0 in the clerk-dependencies group

## 0.8.6

### Patch Changes

- e34bc8b: Bump @clerk/backend from 1.24.2 to 1.24.3
- e34bc8b: Bump @clerk/shared from 2.22.0 to 3.0.0
- e34bc8b: Bump @clerk/types from 4.46.1 to 4.47.0

## 0.8.5

### Patch Changes

- 36d96c7: Export the `ClerkContext` interface and `setClerkContext` function. This allows usage without the `ClerkProvider` component in advanced use cases and in tests.

## 0.8.4

### Patch Changes

- d479e0e: Bump @clerk/backend from 1.24.1 to 1.24.2
- d479e0e: Bump @clerk/shared from 2.21.1 to 2.22.0
- d479e0e: Bump @clerk/types from 4.46.0 to 4.46.1

## 0.8.3

### Patch Changes

- f1d3cec: Replace deprecated `page` store from `$app/stores` with `page` state from `$app/state`.
- 32c7921: Allow overriding of `routerPush` and `routerReplace` options in the `<ClerkProvider>` component.

## 0.8.2

### Patch Changes

- ad4226f: Add [`OrganizationList`](https://clerk.com/docs/components/organization/organization-list) component.

  Usage:

  ```svelte
  <script>
  	import { OrganizationList } from 'svelte-clerk';
  </script>

  <OrganizationList />
  ```

- dc8b894: Use shared unstyled button component type props
- e928ae7: Bump Clerk dependencies to latest versions:

  - `@clerk/backend` from ^1.24.0 to ^1.29.1
  - `@clerk/shared` from ^2.21.0 to ^2.28.1
  - `@clerk/types` from ^4.45.1 to ^4.53.3

## 0.8.1

### Patch Changes

- 2ebef19: Bump @clerk/backend from 1.23.11 to 1.24.0
- 2ebef19: Bump @clerk/shared from 2.20.18 to 2.21.0
- 2ebef19: Bump @clerk/types from 4.45.0 to 4.45.1

## 0.8.0

### Minor Changes

- d6ec8cf: Add [
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

## 0.7.5

### Patch Changes

- 25646fb: Bump @clerk/backend from 1.23.9 to 1.23.11
- 25646fb: Bump @clerk/shared from 2.20.16 to 2.20.18
- 25646fb: Bump @clerk/types from 4.44.2 to 4.45.0

## 0.7.4

### Patch Changes

- 6d8bf53: Bump @clerk/backend from 1.23.8 to 1.23.9
- 6d8bf53: Bump @clerk/shared from 2.20.15 to 2.20.16
- 6d8bf53: Bump @clerk/types from 4.44.1 to 4.44.2

## 0.7.3

### Patch Changes

- 0a6b40a: Make publishable key prop optional and use env var

## 0.7.2

### Patch Changes

- c520d77: Bump @clerk/backend from 1.23.7 to 1.23.8
- c520d77: Bump @clerk/shared from 2.20.14 to 2.20.15
- c520d77: Bump @clerk/types from 4.44.0 to 4.44.1

## 0.7.1

### Patch Changes

- 0d84650: Bump @clerk/backend from 1.23.1 to 1.23.7
- 0d84650: Bump @clerk/shared from 2.20.8 to 2.20.14
- 0d84650: Bump @clerk/types from 4.41.0 to 4.44.0

## 0.7.0

### Minor Changes

- 2fdb203: Add sign-in-or-up feature props

### Patch Changes

- 269121d: Bump @clerk/backend from 1.21.6 to 1.23.1
- 19daf49: Bump @clerk/shared from 2.20.6 to 2.20.8
- 19daf49: Bump @clerk/types from 4.40.2 to 4.41.0

## 0.6.0

### Minor Changes

- e8c59ec: Automatically use env vars for `<ClerkProvider>` props and server utils

## 0.5.4

### Patch Changes

- 84e0825: Bump @clerk/backend from 1.21.4 to 1.21.6
- 84e0825: Bump @clerk/shared from 2.20.4 to 2.20.6
- 84e0825: Bump @clerk/types from 4.40.0 to 4.40.2

## 0.5.3

### Patch Changes

- e9a43fb: Bump @clerk/backend from 1.21.2 to 1.21.4
- e9a43fb: Bump @clerk/shared from 2.20.2 to 2.20.4
- e9a43fb: Bump @clerk/types from 4.39.4 to 4.40.0

## 0.5.2

### Patch Changes

- d8da67b: Bump @clerk/backend from 1.21.1 to 1.21.2
- d8da67b: Bump @clerk/shared from 2.20.1 to 2.20.2
- d8da67b: Bump @clerk/types from 4.39.3 to 4.39.4

## 0.5.1

### Patch Changes

- cafdcfe: Bump @clerk/backend from 1.21.0 to 1.21.1
- cafdcfe: Bump @clerk/shared from 2.20.0 to 2.20.1
- cafdcfe: Bump @clerk/types from 4.39.2 to 4.39.3

## 0.5.0

### Minor Changes

- 8a0b719: Add `currentUser` helper function.

  Usage:

  ```ts
  // src/routes/user/+page.server.ts
  export const load = async ({ locals }) => {
  	const user = await locals.currentUser();

  	return {
  		user
  	};
  };
  ```

## 0.4.15

### Patch Changes

- fa9038f: Bump @clerk/backend from 1.20.0 to 1.21.0
- fa9038f: Bump @clerk/shared from 2.19.1 to 2.20.0
- fa9038f: Bump @clerk/types from 4.39.0 to 4.39.2

## 0.4.14

### Patch Changes

- 676676e: Bump @clerk/backend from 1.19.2 to 1.20.0
- 676676e: Bump @clerk/shared from 2.19.0 to 2.19.1
- 676676e: Bump @clerk/types from 4.38.0 to 4.39.0

## 0.4.13

### Patch Changes

- bc23b5e: Bump @clerk/backend from 1.19.1 to 1.19.2
- bc23b5e: Bump @clerk/shared from 2.18.1 to 2.19.0
- bc23b5e: Bump @clerk/types from 4.37.0 to 4.38.0

## 0.4.12

### Patch Changes

- d3223b5: Bump @clerk/backend from 1.19.0 to 1.19.1
- d3223b5: Bump @clerk/shared from 2.18.0 to 2.18.1
- d3223b5: Bump @clerk/types from 4.36.0 to 4.37.0

## 0.4.11

### Patch Changes

- 2f9cc00: Bump @clerk/backend from 1.18.0 to 1.19.0
- 2f9cc00: Bump @clerk/shared from 2.17.0 to 2.18.0
- 2f9cc00: Bump @clerk/types from 4.35.0 to 4.36.0

## 0.4.10

### Patch Changes

- 1d693d2: Make sure `$page.data` is defined before accessing initial state properties.

## 0.4.9

### Patch Changes

- bd9aea0: Bump @clerk/backend from 1.17.1 to 1.18.0
- bd9aea0: Bump @clerk/shared from 2.16.0 to 2.17.0
- bd9aea0: Bump @clerk/types from 4.34.1 to 4.35.0

## 0.4.8

### Patch Changes

- 98e59a5: Fix missing internal prop updater

## 0.4.7

### Patch Changes

- 2837233: Improve internal Clerk UI action

## 0.4.6

### Patch Changes

- cb1a13b: Bump @clerk/backend from 1.16.4 to 1.17.1
- cb1a13b: Bump @clerk/shared from 2.14.0 to 2.16.0
- bf93894: Bump @clerk/types from 4.34.0 to 4.34.1

## 0.4.5

### Patch Changes

- 8774eb2: Bump @clerk/backend from 1.16.2 to 1.16.4
- 8774eb2: Bump @clerk/shared from 2.12.1 to 2.14.0
- 8774eb2: Bump @clerk/types from 4.32.0 to 4.34.0

## 0.4.4

### Patch Changes

- 41241f7: Bump @clerk/backend from 1.16.1 to 1.16.2 in the clerk-dependencies group

## 0.4.3

### Patch Changes

- ff325ba: Bump @clerk/backend from 1.16.0 to 1.16.1
- ff325ba: Bump @clerk/shared from 2.12.0 to 2.12.1
- ff325ba: Bump @clerk/types from 4.31.0 to 4.32.0
- 547ec7d: Fix API url default value

## 0.4.2

### Patch Changes

- cd4e089: Bump @clerk/backend from 1.15.6 to 1.16.0
- cd4e089: Bump @clerk/shared from 2.11.4 to 2.12.0
- 44bd3d5: Bump @clerk/types from 4.30.0 to 4.31.0

## 0.4.1

### Patch Changes

- c0e496a: Do not remount UI components on prop update

## 0.4.0

### Minor Changes

- ec86595: Add `<Waitlist />` component

### Patch Changes

- 86b4096: Bump @clerk/backend from 1.15.5 to 1.15.6
- 86b4096: Bump @clerk/shared from 2.11.3 to 2.11.4
- 86b4096: Bump @clerk/types from 4.29.0 to 4.30.0

## 0.3.8

### Patch Changes

- ce9b788: Bump @clerk/backend from 1.15.2 to 1.15.5
- ce9b788: Bump @clerk/shared from 2.11.0 to 2.11.3

## 0.3.7

### Patch Changes

- fe674c0: Bump @clerk/backend from 1.15.1 to 1.15.2
- fe674c0: Bump @clerk/shared from 2.10.1 to 2.11.0
- fe674c0: Bump @clerk/types from 4.28.0 to 4.29.0

## 0.3.6

### Patch Changes

- 0eaa484: Simplify SSR props

## 0.3.5

### Patch Changes

- 07b13b9: Fix cookie setting

## 0.3.4

### Patch Changes

- b5269ca: Fix env vars access when prerendering

## 0.3.3

### Patch Changes

- 3340fba: React to UI component prop updates

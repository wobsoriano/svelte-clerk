---
'svelte-clerk': major
---

This release aligns `svelte-clerk` with Clerk Core 3 and includes breaking API updates.

### Breaking changes

- **Control components have been unified under `<Show>`**:
  - `<Protect>`, `<SignedIn>`, and `<SignedOut>` are removed.
  - Use `<Show when="signed-in">`, `<Show when="signed-out">`, or authorization conditions (for example `when={{ role: 'org:admin' }}`).
- **Core dependencies were upgraded**:
  - `@clerk/backend` -> `3.0.0`
  - `@clerk/shared` -> `4.0.0`

### New exports and components

- Added new interactive components:
  - `<APIKeys />`
  - `<UserAvatar />`
- Added `getToken` export from `svelte-clerk`.

### Migration notes

- Replace old control components with `<Show>`:
  - `<SignedIn>...</SignedIn>` -> `<Show when="signed-in">...</Show>`
  - `<SignedOut>...</SignedOut>` -> `<Show when="signed-out">...</Show>`
  - `<Protect role="org:admin">...</Protect>` -> `<Show when={{ role: 'org:admin' }}>...</Show>`

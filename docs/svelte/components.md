# Components

The following [Clerk UI components](https://clerk.com/docs/components/overview) are available in Svelte Clerk:

- `<ClerkLoaded>`
- `<ClerkLoading>`
- `<Protect>`
- `<SignedIn>`
- `<SignedOut>`
- `<SignIn>`
- `<SignUp>`
- `<UserButton>`
- `<UserProfile>`
- `<OrganizationList>`
- `<OrganizationProfile>`
- `<OrganizationSwitcher>`
- `<CreateOrganization>`
- `<GoogleOneTap>`
- `<Waitlist />`

The main difference is that the Svelte components use [`Snippets`](https://svelte.dev/docs/svelte/snippet) to render their content.

Here's an example of the [`<Protect>`](https://clerk.com/docs/components/protect) component with a fallback message:

```svelte
<script lang="ts">
	import { Protect } from 'svelte-clerk/client';
</script>

<template>
	<Protect permission="org:invoices:create">
		{#snippet fallback()}
			<p>You do not have the permissions to create an invoice.</p>
		{/snippet}
	</Protect>
</template>
```

To see list of available props for each components, visit the [Clerk UI components documentation](https://clerk.com/docs/components/overview).

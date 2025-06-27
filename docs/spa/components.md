# Components

The following [Clerk UI components](https://clerk.com/docs/components/overview) are available in Svelte Clerk:

- `<ClerkLoaded>` ([clerk docs](https://clerk.com/docs/components/control/clerk-loaded))
- `<ClerkLoading>` ([clerk docs](https://clerk.com/docs/components/control/clerk-loading))
- `<Protect>` ([clerk docs](https://clerk.com/docs/components/protect))
- `<SignedIn>` ([clerk docs](https://clerk.com/docs/components/control/signed-in))
- `<SignedOut>` ([clerk docs](https://clerk.com/docs/components/control/signed-out))
- `<SignIn>` ([clerk docs](https://clerk.com/docs/components/authentication/sign-in))
- `<SignUp>` ([clerk docs](https://clerk.com/docs/components/authentication/sign-up))
- `<UserButton>` ([clerk docs](https://clerk.com/docs/components/user/user-button))
- `<UserProfile>` ([clerk docs](https://clerk.com/docs/components/user/user-profile))
- `<OrganizationList>` ([clerk docs](https://clerk.com/docs/components/organization/organization-list))
- `<OrganizationProfile>` ([clerk docs](https://clerk.com/docs/components/organization/organization-profile))
- `<OrganizationSwitcher>` ([clerk docs](https://clerk.com/docs/components/organization/organization-switcher))
- `<CreateOrganization>` ([clerk docs](https://clerk.com/docs/components/organization/create-organization))
- `<GoogleOneTap>` ([clerk docs](https://clerk.com/docs/components/authentication/google-one-tap))
- `<Waitlist />` ([clerk docs](https://clerk.com/docs/components/waitlist))

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

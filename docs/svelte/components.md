# Components

The following [Clerk UI components](https://clerk.com/docs/components/overview) are available in Svelte Clerk:

- `<Show>` ([clerk docs](https://clerk.com/docs/react/reference/components/control/show))
- `<SignIn>` ([clerk docs](https://clerk.com/docs/components/authentication/sign-in))
- `<SignUp>` ([clerk docs](https://clerk.com/docs/components/authentication/sign-up))
- `<UserButton>` ([clerk docs](https://clerk.com/docs/components/user/user-button))
- `<UserAvatar>` ([clerk docs](https://clerk.com/docs/components/user/user-avatar))
- `<UserProfile>` ([clerk docs](https://clerk.com/docs/components/user/user-profile))
- `<OrganizationList>` ([clerk docs](https://clerk.com/docs/components/organization/organization-list))
- `<OrganizationProfile>` ([clerk docs](https://clerk.com/docs/components/organization/organization-profile))
- `<OrganizationSwitcher>` ([clerk docs](https://clerk.com/docs/components/organization/organization-switcher))
- `<CreateOrganization>` ([clerk docs](https://clerk.com/docs/components/organization/create-organization))
- `<GoogleOneTap>` ([clerk docs](https://clerk.com/docs/components/authentication/google-one-tap))
- `<Waitlist />` ([clerk docs](https://clerk.com/docs/components/waitlist))
- `<PricingTable />` ([clerk docs](https://clerk.com/docs/components/pricing-table))
- `<APIKeys />` ([clerk docs](https://clerk.com/docs/components/organization/api-keys))
- `<ClerkLoaded>` ([clerk docs](https://clerk.com/docs/components/control/clerk-loaded))
- `<ClerkLoading>` ([clerk docs](https://clerk.com/docs/components/control/clerk-loading))

The main difference is that the Svelte components use [`Snippets`](https://svelte.dev/docs/svelte/snippet) to render their content.

Here's an example of the [`<Show>`](https://clerk.com/docs/react/reference/components/control/show) component with a fallback message:

```svelte
<script lang="ts">
	import { Show } from 'svelte-clerk/client';
</script>

<template>
	<Show when={{ permission: 'org:invoices:create' }}>
		{#snippet fallback()}
			<p>You do not have the permissions to create an invoice.</p>
		{/snippet}
	</Show>
</template>
```

To see list of available props for each components, visit the [Clerk UI components documentation](https://clerk.com/docs/components/overview).

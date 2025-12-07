export { type ClerkContext, setClerkContext, useClerkContext } from './context.js';
export {
	CreateOrganization,
	OrganizationSwitcher,
	GoogleOneTap,
	UserButton,
	Waitlist,
	PricingTable,
	ClerkLoaded,
	ClerkLoading,
	Protect,
	SignedIn,
	SignedOut,
	AuthenticateWithRedirectCallback,
	RedirectToSignIn,
	RedirectToSignUp,
	SignInButton,
	SignUpButton,
	SignOutButton
} from './client/index.js';

// Path-based routing components
export { default as SignIn } from './server-components/SignIn.svelte';
export { default as SignUp } from './server-components/SignUp.svelte';
export { default as UserProfile } from './server-components/UserProfile.svelte';
export { default as OrganizationProfile } from './server-components/OrganizationProfile.svelte';
export { default as OrganizationList } from './server-components/OrganizationList.svelte';

export { default as ClerkProvider } from './ClerkProvider.svelte';

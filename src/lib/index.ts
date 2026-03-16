export { type ClerkContext, setClerkContext, useClerkContext } from './context.js';
export {
	CreateOrganization,
	OrganizationSwitcher,
	GoogleOneTap,
	UserButton,
	Waitlist,
	PricingTable,
	APIKeys,
	UserAvatar,
	ClerkLoaded,
	ClerkLoading,
	Show,
	AuthenticateWithRedirectCallback,
	RedirectToSignIn,
	RedirectToSignUp,
	SignInButton,
	SignUpButton,
	SignOutButton,
	useSignIn,
	useSignUp
} from './client/index.js';

// Path-based routing components
export { default as SignIn } from './server-components/SignIn.svelte';
export { default as SignUp } from './server-components/SignUp.svelte';
export { default as UserProfile } from './server-components/UserProfile.svelte';
export { default as OrganizationProfile } from './server-components/OrganizationProfile.svelte';
export { default as OrganizationList } from './server-components/OrganizationList.svelte';

export { default as ClerkProvider } from './ClerkProvider.svelte';
export { getToken } from '@clerk/shared/getToken';

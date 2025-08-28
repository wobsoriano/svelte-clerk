export { type ClerkContext, setClerkContext, useClerkContext } from '$lib/context.js';

// Interactive components
export { default as SignIn } from './interactive/SignIn.svelte';
export { default as SignUp } from './interactive/SignUp.svelte';
export { default as UserProfile } from './interactive/UserProfile.svelte';
export { default as CreateOrganization } from './interactive/CreateOrganization.svelte';
export { default as OrganizationList } from './interactive/OrganizationList.svelte';
export { default as OrganizationSwitcher } from './interactive/OrganizationSwitcher.svelte';
export { default as OrganizationProfile } from './interactive/OrganizationProfile.svelte';
export { default as GoogleOneTap } from './interactive/GoogleOneTap.svelte';
export { default as UserButton } from './interactive/UserButton';
export { default as Waitlist } from './interactive/Waitlist.svelte';
export { default as PricingTable } from './interactive/PricingTable.svelte';

// Control components
export { default as ClerkLoaded } from './control/ClerkLoaded.svelte';
export { default as ClerkLoading } from './control/ClerkLoading.svelte';
export { default as Protect } from './control/Protect.svelte';
export { default as SignedIn } from './control/SignedIn.svelte';
export { default as SignedOut } from './control/SignedOut.svelte';
export { default as AuthenticateWithRedirectCallback } from './control/AuthenticateWithRedirectCallback.svelte';
export { default as RedirectToSignIn } from './control/RedirectToSignIn.svelte';
export { default as RedirectToSignUp } from './control/RedirectToSignUp.svelte';

// Unstyled components
export { default as SignInButton } from './unstyled/SignInButton.svelte';
export { default as SignUpButton } from './unstyled/SignUpButton.svelte';
export { default as SignOutButton } from './unstyled/SignOutButton.svelte';

// Provider
export { default as ClerkProvider } from './ClerkProvider.svelte';

// Helpers
export * from './helpers/useAuth.svelte.js';
export * from './helpers/useSession.svelte.js';
export * from './helpers/useSessionList.svelte.js';
export * from './helpers/useUser.svelte.js';
export * from './helpers/useSignIn.svelte.js';
export * from './helpers/useSignUp.svelte.js';

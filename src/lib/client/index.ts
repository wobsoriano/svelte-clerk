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
export { default as APIKeys } from './interactive/APIKeys.svelte';
export { default as UserAvatar } from './interactive/UserAvatar.svelte';

// Control components
export { default as ClerkLoaded } from './control/ClerkLoaded.svelte';
export { default as ClerkLoading } from './control/ClerkLoading.svelte';
export { default as Show } from './control/Show.svelte';
export { default as AuthenticateWithRedirectCallback } from './control/AuthenticateWithRedirectCallback.svelte';
export { default as RedirectToSignIn } from './control/RedirectToSignIn.svelte';
export { default as RedirectToSignUp } from './control/RedirectToSignUp.svelte';

// Unstyled components
export { default as SignInButton } from './unstyled/SignInButton.svelte';
export { default as SignUpButton } from './unstyled/SignUpButton.svelte';
export { default as SignOutButton } from './unstyled/SignOutButton.svelte';

// Hooks
export { useSignIn, useSignUp } from './hooks/index.js';

// Provider
export { default as ClerkProvider } from './ClerkProvider.svelte';

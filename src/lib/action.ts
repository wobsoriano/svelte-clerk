import type {
	Clerk,
	SignInProps,
	SignUpProps,
	UserButtonProps,
	UserProfileProps,
	OrganizationProfileProps,
	OrganizationSwitcherProps,
	CreateOrganizationProps
} from '@clerk/types';
import { useClerkContext } from '$lib/context.js';
import type { Action } from 'svelte/action';

type ComponentPropsMap = {
	SignIn: SignInProps;
	SignUp: SignUpProps;
	UserButton: UserButtonProps;
	UserProfile: UserProfileProps;
	OrganizationProfile: OrganizationProfileProps;
	OrganizationSwitcher: OrganizationSwitcherProps;
	CreateOrganization: CreateOrganizationProps;
};

type ClerkUIConfig<T extends keyof ComponentPropsMap = keyof ComponentPropsMap> = {
	clerk?: Clerk | null;
	component: T;
	props?: ComponentPropsMap[T];
};

export const clerkUI: Action<HTMLDivElement, ClerkUIConfig> = (node, { component, props }) => {
	const ctx = useClerkContext();

	if (ctx.clerk) {
		ctx.clerk[`mount${component}`](node, props as Record<string, unknown>);
	}

	return {
		destroy: () => {
			ctx.clerk?.[`unmount${component}`](node);
		}
	};
};

export default clerkUI;

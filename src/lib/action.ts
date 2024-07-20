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
	clerk: Clerk;
	component: T;
	props?: ComponentPropsMap[T];
};

export const clerkUI: Action<HTMLDivElement, ClerkUIConfig> = (
	node,
	{ clerk, component, props }
) => {
	if (clerk) {
		clerk[`mount${component}`](node, props as Record<string, unknown>);
	}

	return {
		destroy: () => {
			clerk[`unmount${component}`](node);
		}
	};
};

export default clerkUI;

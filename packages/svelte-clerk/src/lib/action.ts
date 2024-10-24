import type {
	Clerk,
	SignInProps,
	SignUpProps,
	UserButtonProps,
	UserProfileProps,
	OrganizationProfileProps,
	OrganizationSwitcherProps,
	CreateOrganizationProps,
	GoogleOneTapProps
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
	GoogleOneTap: GoogleOneTapProps;
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
		if (component === 'GoogleOneTap') {
			clerk.openGoogleOneTap(props);
		} else {
			clerk[`mount${component}`](node, props as Record<string, unknown>);
		}
	}

	return {
		destroy: () => {
			if (component === 'GoogleOneTap') {
				clerk.closeGoogleOneTap();
			} else {
				clerk[`unmount${component}`](node);
			}
		}
	};
};

export default clerkUI;

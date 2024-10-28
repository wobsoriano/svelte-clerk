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
	const mountComponent = ({ clerk, component, props }: ClerkUIConfig) => {
		if (component === 'GoogleOneTap') {
			clerk.openGoogleOneTap(props);
		} else {
			clerk[`mount${component}`](node, props as Record<string, unknown>);
		}
	};

	const unmountComponent = ({ clerk, component }: ClerkUIConfig) => {
		if (component === 'GoogleOneTap') {
			clerk.closeGoogleOneTap();
		} else {
			clerk[`unmount${component}`](node);
		}
	};

	if (clerk) {
		mountComponent({ clerk, component, props });
	}

	return {
		update: ({ clerk, component, props }) => {
			unmountComponent({ clerk, component });
			mountComponent({ clerk, component, props });
		},
		destroy: () => {
			unmountComponent({ clerk, component });
		}
	};
};

export default clerkUI;

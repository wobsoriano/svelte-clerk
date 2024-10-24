import type {
	ActiveSessionResource,
	ActJWTClaim,
	ClientResource,
	OrganizationCustomPermissionKey,
	OrganizationCustomRoleKey,
	OrganizationResource,
	UserResource
} from '@clerk/types';
import type { HeadlessBrowserClerk, BrowserClerk } from '$lib/types.js';
import { getContext, setContext } from 'svelte';

const _contextKey = '$$_clerk';

interface ClerkContext {
	clerk: HeadlessBrowserClerk | BrowserClerk | null;
	isLoaded: boolean;
	auth: {
		userId: string | null | undefined;
		sessionId: string | null | undefined;
		actor: ActJWTClaim | null | undefined;
		orgId: string | null | undefined;
		orgRole: OrganizationCustomRoleKey | null | undefined;
		orgSlug: string | null | undefined;
		orgPermissions: OrganizationCustomPermissionKey[] | null | undefined;
	};
	client: ClientResource | null | undefined;
	session: ActiveSessionResource | null | undefined;
	user: UserResource | null | undefined;
	organization: OrganizationResource | null | undefined;
}

export const useClerkContext = (): ClerkContext => {
	const client = getContext(_contextKey);
	if (!client) {
		throw new Error(
			'No Clerk data was found in Svelte context. Did you forget to wrap your component with ClerkProvider?'
		);
	}

	return client as ClerkContext;
};

export const setClerkContext = (context: ClerkContext): void => {
	setContext(_contextKey, context);
};

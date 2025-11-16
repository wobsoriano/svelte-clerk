import type {
	SignedInSessionResource,
	ActClaim,
	ClientResource,
	OrganizationCustomPermissionKey,
	OrganizationCustomRoleKey,
	OrganizationResource,
	UserResource,
	SessionStatusClaim,
	JwtPayload
} from '@clerk/shared/types';
import type { HeadlessBrowserClerk, BrowserClerk } from '$lib/types.js';
import { getContext, setContext } from 'svelte';

const _contextKey = '$$_clerk';

export interface ClerkContext {
	/**
	 * See https://clerk.com/docs/references/javascript/clerk
	 */
	clerk: HeadlessBrowserClerk | BrowserClerk | null;
	/**
	 * Check if the Clerk object is ready for use or not
	 */
	isLoaded: boolean;
	auth: {
		userId: string | null | undefined;
		sessionId: string | null | undefined;
		actor: ActClaim | null | undefined;
		sessionStatus: SessionStatusClaim | null | undefined;
		sessionClaims: JwtPayload | null | undefined;
		orgId: string | null | undefined;
		orgRole: OrganizationCustomRoleKey | null | undefined;
		orgSlug: string | null | undefined;
		orgPermissions: OrganizationCustomPermissionKey[] | null | undefined;
		factorVerificationAge: [number, number] | null;
	};
	/**
	 * See https://clerk.com/docs/references/javascript/client
	 */
	client: ClientResource | null | undefined;
	/**
	 * See https://clerk.com/docs/references/javascript/session
	 */
	session: SignedInSessionResource | null | undefined;
	/**
	 * See https://clerk.com/docs/references/javascript/user
	 */
	user: UserResource | null | undefined;
	/**
	 * See https://clerk.com/docs/references/javascript/organization
	 */
	organization: OrganizationResource | null | undefined;
}

export const useClerkContext = (): ClerkContext => {
	const client = getContext<ClerkContext>(_contextKey);
	if (!client) {
		throw new Error(
			'No Clerk data was found in Svelte context. Did you forget to wrap your component with ClerkProvider?'
		);
	}

	return client;
};

export const setClerkContext = (context: ClerkContext): void => {
	setContext(_contextKey, context);
};

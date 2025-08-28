import { useClerkContext } from '$lib/context';
import { errorThrower } from '$lib/errors/errorThrower';
import { invalidStateError } from '$lib/errors/messages';
import { createCheckAuthorization, resolveAuthState } from '@clerk/shared/authorization';
import type {
	UseAuthReturn,
	Clerk,
	GetToken,
	JwtPayload,
	SignOut,
	UseSessionReturn,
	PendingSessionOptions
} from '@clerk/types';

export type UseAuth = (options?: PendingSessionOptions) => UseAuthReturn;

function clerkLoaded(isLoaded: () => boolean, clerk: () => Clerk | null) {
	return new Promise<Clerk>((resolve) => {
		$effect(() => {
			if (isLoaded()) {
				resolve(clerk()!);
			}
		});
	});
}

function createGetToken(isLoaded: () => boolean, clerk: () => Clerk | null) {
	return async (options: any) => {
		const loadedClerk = await clerkLoaded(isLoaded, clerk);
		if (!loadedClerk.session) {
			return null;
		}

		return loadedClerk.session.getToken(options);
	};
}

function createSignOut(isLoaded: () => boolean, clerk: () => Clerk | null) {
	return async (...args: any) => {
		const loadedClerk = await clerkLoaded(isLoaded, clerk);
		return loadedClerk.signOut(...args);
	};
}

/**
 * Returns the current auth state, the user and session ids and the `getToken`
 * that can be used to retrieve the given template or the default Clerk token.
 *
 * Until Clerk loads, `isLoaded` will be set to `false`.
 * Once Clerk loads, `isLoaded` will be set to `true`, and you can
 * safely access the `userId` and `sessionId` variables.
 *
 * @example
 * <script setup>
 * import { useAuth } from '@clerk/vue'
 *
 * const { isSignedIn, sessionId, userId } = useAuth()
 * </script>
 *
 * <template>
 *   <div v-if="isSignedIn">
 *     <!-- {{ sessionId }} {{ userId }} -->
 *     ...
 *   </div>
 * </template>
 */
export const useAuth: UseAuth = (options = {}) => {
	const ctx = useClerkContext();

	const getToken: GetToken = createGetToken(
		() => ctx.isLoaded,
		() => ctx.clerk
	);
	const signOut: SignOut = createSignOut(
		() => ctx.isLoaded,
		() => ctx.clerk
	);

	const result = $derived.by<UseAuthReturn>(() => {
		const { userId, orgId, orgRole, orgPermissions, sessionClaims, factorVerificationAge } =
			ctx.auth;

		const has = createCheckAuthorization({
			userId,
			orgId,
			orgRole,
			orgPermissions,
			factorVerificationAge,
			features: ((sessionClaims as JwtPayload | undefined)?.fea as string) || '',
			plans: ((sessionClaims as JwtPayload | undefined)?.pla as string) || ''
		});

		const payload = resolveAuthState({
			authObject: {
				...ctx.auth,
				getToken,
				signOut,
				has
			},
			options: {
				treatPendingAsSignedOut: options.treatPendingAsSignedOut
			}
		});

		if (!payload) {
			return errorThrower.throw(invalidStateError);
		}

		return payload;
	});

	return result;
};

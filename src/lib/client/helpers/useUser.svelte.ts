import { useClerkContext } from '$lib/context';
import type { UseUserReturn } from '@clerk/types';

export type UseUser = () => UseUserReturn;

/**
 * Returns the current user's [`User`](https://clerk.com/docs/references/javascript/user/user) object along with loading states.
 *
 * @example
 * <script>
 * import { useUser } from '@clerk/vue'
 *
 * const { isLoaded, isSignedIn, user } = useUser()
 * </script>
 *
 * <template>
 *   <div v-if="!isLoaded">
 *     <!-- Handle loading state -->
 *   </div>
 *
 *   <div v-else-if="isSignedIn">
 *     Hello {{ user.fullName }}!
 *   </div>
 *
 *   <div v-else>
 *     Not signed in
 *   </div>
 * </template>
 */
export const useUser: UseUser = () => {
	const ctx = useClerkContext();

	const result = $derived.by<UseUserReturn>(() => {
		if (ctx.user === undefined) {
			return { isLoaded: false, isSignedIn: undefined, user: undefined };
		}

		if (ctx.user === null) {
			return { isLoaded: true, isSignedIn: false, user: null };
		}

		return { isLoaded: true, isSignedIn: true, user: ctx.user };
	});

	return result;
};

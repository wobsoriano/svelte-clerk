import { useClerkContext } from '$lib/context';
import type { UseSessionReturn } from '@clerk/types';

export type UseSession = () => {
  get current(): UseSessionReturn
};

/**
 * Returns the current [`Session`](https://clerk.com/docs/references/javascript/session) object which provides
 * information about the active session and methods to manage it.
 *
 * @example
 * <script setup>
 * import { useSession } from '@clerk/vue'
 *
 * const { isLoaded, session, isSignedIn } = useSession()
 * </script>
 *
 * <template>
 *   <div v-if="!isLoaded">
 *     <!-- Handle loading state -->
 *   </div>
 *
 *   <div v-else-if="!isSignedIn">
 *     <!-- Handle not signed in state -->
 *   </div>
 *
 *   <div v-else>
 *     <p>This session has been active since {{ session.lastActiveAt.toLocaleString() }}</p>
 *   </div>
 * </template>
 */
export const useSession: UseSession = () => {
	const ctx = useClerkContext();

	const result = $derived.by<UseSessionReturn>(() => {
		if (ctx.session === undefined) {
			return { isLoaded: false, isSignedIn: undefined, session: undefined };
		}

		if (ctx.session === null) {
			return { isLoaded: true, isSignedIn: false, session: null };
		}

		return { isLoaded: true, isSignedIn: !!ctx.clerk?.isSignedIn, session: ctx.session };
	});

	return {
	  get current() {
			return result
		}
	};
};

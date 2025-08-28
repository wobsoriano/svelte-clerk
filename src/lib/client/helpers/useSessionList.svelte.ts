import { useClerkContext } from '$lib/context';
import type { UseSessionListReturn } from '@clerk/types';

export type UseSessionList = () => UseSessionListReturn;

/**
 * Returns an array of [`Session`](https://clerk.com/docs/references/javascript/session) objects that have been
 * registered on the client device.
 *
 * @example
 * <script setup>
 * import { useSessionList } from '@clerk/vue'
 *
 * const { isLoaded, sessions } = useSessionList()
 * </script>
 *
 * <template>
 *   <div v-if="!isLoaded">
 *     <!-- Handle loading state -->
 *   </div>
 *
 *   <div v-else>
 *     <p>
 *       Welcome back. You have been here
 *       {{ sessions.length }} times before.
 *     </p>
 *   </div>
 * </template>
 */
export const useSessionList: UseSessionList = () => {
	const ctx = useClerkContext();

	const result = $derived.by<UseSessionListReturn>(() => {
		if (!ctx.clerk || !ctx.client) {
			return { isLoaded: false, sessions: undefined, setActive: undefined };
		}

		return {
			isLoaded: true,
			sessions: ctx.client.sessions,
			setActive: ctx.clerk.setActive
		};
	});

	return result;
};

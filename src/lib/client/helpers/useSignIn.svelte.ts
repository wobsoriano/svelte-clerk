import { useClerkContext } from '$lib/context';
import type { UseSignInReturn } from '@clerk/types';

export type UseSignIn = () => {
  get current(): UseSignInReturn
};

/**
 * Returns the current [`SignIn`](https://clerk.com/docs/references/javascript/sign-in) object which provides
 * methods and state for managing the sign-in flow.
 *
 * @example
 * <script setup>
 * import { useSignIn } from '@clerk/vue'
 *
 * const { isLoaded, signIn } = useSignIn()
 * </script>
 *
 * <template>
 *   <div v-if="!isLoaded">
 *     <!-- Handle loading state -->
 *   </div>
 *
 *   <div v-else>
 *     The current sign in attempt status is {{ signIn.status }}.
 *   </div>
 * </template>
 */
export const useSignIn: UseSignIn = () => {
	const ctx = useClerkContext();

	const result = $derived.by<UseSignInReturn>(() => {
		if (!ctx.clerk || !ctx.client) {
			return { isLoaded: false, signIn: undefined, setActive: undefined };
		}

		return {
			isLoaded: true,
			signIn: ctx.client.signIn,
			setActive: ctx.clerk.setActive
		};
	});

	return {
    get current() {
      return result
    }
	};
};

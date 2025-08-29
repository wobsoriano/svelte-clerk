import { useClerkContext } from '$lib/context';
import type { UseSignUpReturn } from '@clerk/types';

export type UseSignUp = () => {
  get current(): UseSignUpReturn
};

/**
 * Returns the current [`SignUp`](https://clerk.com/docs/references/javascript/sign-up) object which provides
 * methods and state for managing the sign-up flow.
 *
 * @example
 * <script setup>
 * import { useSignUp } from '@clerk/vue'
 *
 * const { isLoaded, signUp } = useSignUp()
 * </script>
 *
 * <template>
 *   <div v-if="!isLoaded">
 *     <!-- Handle loading state -->
 *   </div>
 *
 *   <div v-else>
 *     The current sign-up attempt status is {{ signUp.status }}.
 *   </div>
 * </template>
 */
export const useSignUp: UseSignUp = () => {
	const ctx = useClerkContext();

	const result = $derived.by<UseSignUpReturn>(() => {
		if (!ctx.clerk || !ctx.client) {
			return { isLoaded: false, signUp: undefined, setActive: undefined };
		}

		return {
			isLoaded: true,
			signUp: ctx.client.signUp,
			setActive: ctx.clerk.setActive
		};
	});

	return {
	  get current() {
      return result
    }
	};
};

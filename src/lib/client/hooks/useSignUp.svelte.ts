import type { NullableSignUpSignal } from '@clerk/shared/types';
import { useClerkContext } from '$lib/context.js';

export function useSignUp() {
	const ctx = useClerkContext();

	let value = $state<NullableSignUpSignal>({
		signUp: null,
		errors: {
			fields: {
				firstName: null,
				lastName: null,
				emailAddress: null,
				phoneNumber: null,
				password: null,
				username: null,
				code: null,
				captcha: null,
				legalAccepted: null
			},
			raw: null,
			global: null
		},
		fetchStatus: 'idle'
	});

	$effect(() => {
		const clerk = ctx.clerk;
		if (!clerk || !clerk.loaded) return;

		const unsub = clerk.__internal_state.__internal_effect(() => {
			value = clerk.__internal_state.signUpSignal();
		});

		return unsub;
	});

	return {
		get current() {
			return value;
		}
	};
}

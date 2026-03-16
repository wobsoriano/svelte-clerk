import type { NullableSignInSignal } from '@clerk/shared/types';
import { useClerkContext } from '$lib/context.js';

export function useSignIn() {
	const ctx = useClerkContext();

	let value = $state<NullableSignInSignal>({
		signIn: null,
		errors: { fields: { identifier: null, password: null, code: null }, raw: null, global: null },
		fetchStatus: 'idle'
	});

	$effect(() => {
		const clerk = ctx.clerk;
		if (!clerk || !clerk.loaded) return;

		const unsub = clerk.__internal_state.__internal_effect(() => {
			value = clerk.__internal_state.signInSignal();
		});

		return unsub;
	});

	return {
		get signIn() {
			return value.signIn;
		},
		get errors() {
			return value.errors;
		},
		get fetchStatus() {
			return value.fetchStatus;
		}
	};
}

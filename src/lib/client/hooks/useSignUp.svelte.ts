import type { NullableSignUpSignal } from '@clerk/shared/types';
import { useClerkContext } from '$lib/context.js';

export function useSignUp() {
	const ctx = useClerkContext();

	let value = $state<NullableSignUpSignal | null>(null);

	$effect(() => {
		const clerk = ctx.clerk;
		if (!clerk || !clerk.loaded) return;

		const unsub = clerk.__internal_state.__internal_effect(() => {
			value = clerk.__internal_state.signUpSignal();
		});

		return unsub;
	});

	return {
		get signUp() {
			return value?.signUp ?? null;
		},
		get errors() {
			return value?.errors ?? null;
		},
		get fetchStatus() {
			return value?.fetchStatus ?? 'idle';
		}
	};
}

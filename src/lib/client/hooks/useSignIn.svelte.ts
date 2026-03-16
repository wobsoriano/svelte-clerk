import type { NullableSignInSignal } from '@clerk/shared/types';
import { useClerkContext } from '$lib/context.js';

export function useSignIn() {
	const ctx = useClerkContext();

	let value = $state<NullableSignInSignal | null>(null);

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
			return value?.signIn ?? null;
		},
		get errors() {
			return value?.errors ?? null;
		},
		get fetchStatus() {
			return value?.fetchStatus ?? 'idle';
		}
	};
}

/**
 * Default plausible values for signal hooks before Clerk loads.
 *
 * These mirror the defaults from React's StateProxy (stateProxy.ts).
 * When @clerk/shared exports these, this file can be replaced with
 * a direct import.
 */
import type { NullableSignInSignal, NullableSignUpSignal } from '@clerk/shared/types';

export const defaultSignInSignal = (): NullableSignInSignal => ({
	signIn: null,
	errors: {
		fields: {
			identifier: null,
			password: null,
			code: null
		},
		raw: null,
		global: null
	},
	fetchStatus: 'idle'
});

export const defaultSignUpSignal = (): NullableSignUpSignal => ({
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

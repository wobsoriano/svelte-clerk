import {
	makeAuthObjectSerializable,
	stripPrivateDataFromObject,
	type AuthObject
} from '@clerk/backend/internal';

/**
 * To enable Clerk SSR support, include this object to the props
 * returned from `load`. This will automatically make the auth state available to
 * the Clerk components and hooks during SSR, the hydration phase and CSR.
 * @example
 * import { buildClerkInitialState } from 'svelte-clerk/server';
 *
 * export const load = ({ locals }) => {
 *
 *   return {
 *     initialState: buildClerkInitialState(locals.auth),
 *   };
 * };
 */
export function buildClerkInitialState(auth: AuthObject) {
	return makeAuthObjectSerializable(stripPrivateDataFromObject(auth));
}

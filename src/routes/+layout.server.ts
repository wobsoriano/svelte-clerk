import { buildClerkInitialState } from '$lib/server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	return {
		initialState: buildClerkInitialState(locals.auth)
	};
};

import { buildClerkInitialState } from '$lib/server';
import type { PageServerLoad } from './protected/$types';

export const load: PageServerLoad = ({ locals }) => {
	return {
		initialState: buildClerkInitialState(locals.auth)
	};
};

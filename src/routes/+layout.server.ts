import { buildClerkProps } from '$lib/server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	return {
		...buildClerkProps(locals.auth)
	};
};

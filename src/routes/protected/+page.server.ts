import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	locals.security.isAuthenticated();

	return {
		user: JSON.stringify(locals.auth)
	};
};

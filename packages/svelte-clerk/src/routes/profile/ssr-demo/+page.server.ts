import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	locals.security.isAuthenticated();

	const user = await locals.currentUser()

	return {
		user: JSON.parse(JSON.stringify(user))
	};
};

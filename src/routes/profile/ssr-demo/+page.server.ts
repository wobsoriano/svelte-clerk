import { clerkClient } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	locals.security.isAuthenticated();

	const user = await clerkClient.users.getUser(locals.auth.userId!);

	return {
		user: JSON.parse(JSON.stringify(user))
	};
};

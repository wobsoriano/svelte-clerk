import { clerkClient } from '$lib/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { locals } = event;
	locals.security.isAuthenticated();

	const user = await clerkClient(event).users.getUser(locals.auth().userId!);

	return {
		user: JSON.parse(JSON.stringify(user))
	};
};

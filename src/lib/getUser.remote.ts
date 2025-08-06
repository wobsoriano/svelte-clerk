import { getRequestEvent, query } from '$app/server';
import { clerkClient } from '$lib/server';
import { error } from '@sveltejs/kit';

export const getUser = query(async () => {
	const event = getRequestEvent();

	const { userId } = event.locals.auth();

	if (!userId) error(401, 'Unauthorized');

	const user = await clerkClient.users.getUser(userId);
	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName
	};
});

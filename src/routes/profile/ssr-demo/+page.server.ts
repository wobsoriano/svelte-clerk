import { clerkClient } from '$lib/server';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { userId } = locals.auth
  if (!userId) {
		return redirect(307, '/sign-in');
	}

  const user = await clerkClient.users.getUser(userId);

	return {
		user: JSON.parse(JSON.stringify(user))
	};
};

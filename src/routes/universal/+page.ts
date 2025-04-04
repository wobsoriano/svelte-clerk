import { browser } from '$app/environment';
import type { AuthObject } from '@clerk/backend';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const auth = (await fetch('/api/auth').then((res) => res.json())) as AuthObject;

	console.log(`auth from ${browser ? 'browser' : 'server'}`, auth);

	return {
		auth
	};
};

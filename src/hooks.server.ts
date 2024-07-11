import { type Handle } from '@sveltejs/kit';
import { withClerkHandler } from '$lib/server';
import { PUBLIC_CLERK_SIGN_IN_URL, PUBLIC_CLERK_SIGN_UP_URL } from '$env/static/public';
import { sequence } from '@sveltejs/kit/hooks';
import { Security } from './utils/security';

export const handle: Handle = sequence(
	withClerkHandler({
		debug: false,
		signInUrl: PUBLIC_CLERK_SIGN_IN_URL,
		signUpUrl: PUBLIC_CLERK_SIGN_UP_URL
	}),
	({ event, resolve }) => {
		event.locals.security = new Security(event);

		return resolve(event);
	}
);

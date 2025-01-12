import { type Handle } from '@sveltejs/kit';
import { withClerkHandler } from '$lib/server';
import { sequence } from '@sveltejs/kit/hooks';
import { Security } from './utils/security';

export const handle: Handle = sequence(
	withClerkHandler(),
	({ event, resolve }) => {
		event.locals.security = new Security(event);

		return resolve(event);
	}
);

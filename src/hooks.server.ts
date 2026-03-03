import { type Handle } from '@sveltejs/kit';
import { withClerkHandler } from '$lib/server';
import { sequence } from '@sveltejs/kit/hooks';
import { Security } from './utils/security';
import { dev } from '$app/environment';

export const handle: Handle = sequence(
  ({ event, resolve }) => {
    if (dev && event.url.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
  		return new Response(undefined, { status: 404 });
  	}

    return resolve(event);
  },
  withClerkHandler(),
  ({ event, resolve }) => {
	event.locals.security = new Security(event);

    return resolve(event);
  }
);

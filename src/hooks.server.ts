import { type Handle } from '@sveltejs/kit';
import { withClerkHandler } from '$lib/server';
import { sequence } from '@sveltejs/kit/hooks';
import { Security } from './utils/security';
import { dev } from '$app/environment';
import { env as envPublic } from '$env/dynamic/public'
import { env as envPrivate } from '$env/dynamic/private'

export const handle: Handle = sequence(
  ({ event, resolve }) => {
    if (dev && event.url.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
  		return new Response(undefined, { status: 404 });
  	}

    return resolve(event);
  },
  withClerkHandler({
    publishableKey: envPublic.PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: envPrivate.CLERK_SECRET_KEY,
    signInUrl: envPublic.PUBLIC_CLERK_SIGN_IN_URL,
    signUpUrl: envPublic.PUBLIC_CLERK_SIGN_UP_URL,
    afterSignInUrl: envPublic.PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL,
  }),
  ({ event, resolve }) => {
	event.locals.security = new Security(event);

    return resolve(event);
  }
);

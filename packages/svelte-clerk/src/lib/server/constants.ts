import { constants } from '@clerk/backend/internal';
import { getStaticPublicEnv } from '$lib/utils/getStaticPublicEnv.js';
import { getStaticPrivateEnv } from '$lib/utils/getStaticPrivateEnv.js';
import { isTruthy } from '@clerk/shared/underscore';
import { apiUrlFromPublishableKey } from '@clerk/shared/apiUrlFromPublishableKey';

// Public env variables
export const API_VERSION = getStaticPublicEnv('PUBLIC_CLERK_API_VERSION', 'v1');
export const PUBLISHABLE_KEY = getStaticPublicEnv('PUBLIC_CLERK_PUBLISHABLE_KEY');
export const API_URL = getStaticPublicEnv(
	'PUBLIC_CLERK_API_URL',
	apiUrlFromPublishableKey(PUBLISHABLE_KEY)
);
export const TELEMETRY_DISABLED = isTruthy(getStaticPublicEnv('PUBLIC_CLERK_TELEMETRY_DISABLED'));
export const TELEMETRY_DEBUG = isTruthy(getStaticPublicEnv('PUBLIC_CLERK_TELEMETRY_DEBUG'));
// Private env variables
export const SECRET_KEY = getStaticPrivateEnv('CLERK_SECRET_KEY');
export const JWT_KEY = getStaticPrivateEnv('CLERK_JWT_KEY');

export const { Cookies, Headers } = constants;

import { constants } from '@clerk/backend/internal';
import * as envPublic from '$env/static/public';
import * as envPrivate from '$env/static/private';
import { isTruthy } from '@clerk/shared/underscore';

function getPublicEnv(name: string, defaultValue = ''): string {
	// @ts-expect-error: Due to the way env vars work in SK, we need to make sure it exists before trying to access it
	return name in envPublic ? envPublic[name] : defaultValue;
}

function getPrivateEnv(name: string, defaultValue = ''): string {
	// @ts-expect-error: Due to the way env vars work in SK, we need to make sure it exists before trying to access it
	return name in envPrivate ? envPrivate[name] : defaultValue;
}

// Public env variables
export const API_VERSION = getPublicEnv('PUBLIC_CLERK_API_VERSION', 'v1');
export const PUBLISHABLE_KEY = getPublicEnv('PUBLIC_CLERK_PUBLISHABLE_KEY');
export const API_URL = getPublicEnv('PUBLIC_CLERK_API_URL');
export const TELEMETRY_DISABLED = isTruthy(getPublicEnv('PUBLIC_CLERK_TELEMETRY_DISABLED'));
export const TELEMETRY_DEBUG = isTruthy(getPublicEnv('PUBLIC_CLERK_TELEMETRY_DEBUG'));
// Private env variables
export const SECRET_KEY = getPrivateEnv('CLERK_SECRET_KEY');
export const JWT_KEY = getPrivateEnv('CLERK_JWT_KEY');

export const { Cookies, Headers } = constants;

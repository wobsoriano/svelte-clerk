import { constants } from '@clerk/backend/internal';
import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { isTruthy } from '@clerk/shared/underscore';

export const API_VERSION = publicEnv.PUBLIC_CLERK_API_VERSION || 'v1';
export const SECRET_KEY = privateEnv.CLERK_SECRET_KEY || '';
export const PUBLISHABLE_KEY = publicEnv.PUBLIC_CLERK_PUBLISHABLE_KEY || '';
export const API_URL = publicEnv.PUBLIC_CLERK_API_URL;
export const JWT_KEY = privateEnv.CLERK_JWT_KEY || '';
export const TELEMETRY_DISABLED = isTruthy(publicEnv.PUBLIC_CLERK_TELEMETRY_DISABLED);
export const TELEMETRY_DEBUG = isTruthy(publicEnv.PUBLIC_CLERK_TELEMETRY_DEBUG);

export const { Cookies, Headers } = constants;

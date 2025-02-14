import { constants } from '@clerk/backend/internal';
import {
	getEnvVariable,
	getStaticPublicEnvVariables
} from '$lib/utils/getStaticPublicEnvVariables';
import { getStaticPrivateEnvVariables } from '$lib/utils/getStaticPrivateEnvVariables';
import { apiUrlFromPublishableKey } from '@clerk/shared/apiUrlFromPublishableKey';

// Public env variables
export const API_VERSION = getEnvVariable('PUBLIC_CLERK_API_VERSION', 'v1');
export const PUBLISHABLE_KEY = getStaticPublicEnvVariables().publishableKey!;
export const API_URL = getEnvVariable(
	'PUBLIC_CLERK_API_URL',
	apiUrlFromPublishableKey(PUBLISHABLE_KEY)
);
export const TELEMETRY_DISABLED = getStaticPublicEnvVariables().telemetryDisabled;
export const TELEMETRY_DEBUG = getStaticPublicEnvVariables().telemetryDebug;
// Private env variables
export const SECRET_KEY = getStaticPrivateEnvVariables().secretKey;
export const JWT_KEY = getStaticPrivateEnvVariables().jwtKey;

export const { Cookies, Headers } = constants;

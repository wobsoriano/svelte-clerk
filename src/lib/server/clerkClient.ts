import { createClerkClient } from '@clerk/backend';

import {
	API_URL,
	API_VERSION,
	JWT_KEY,
	SECRET_KEY,
	TELEMETRY_DEBUG,
	TELEMETRY_DISABLED
} from './constants.js';

export const clerkClient = createClerkClient({
	secretKey: SECRET_KEY,
	apiUrl: API_URL,
	apiVersion: API_VERSION,
	jwtKey: JWT_KEY,
	telemetry: {
		disabled: TELEMETRY_DISABLED,
		debug: TELEMETRY_DEBUG
	}
});

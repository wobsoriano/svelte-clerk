import { createClerkClient } from '@clerk/backend';

import { API_URL, API_VERSION, JWT_KEY, SECRET_KEY } from './constants.js';

export const clerkClient = createClerkClient({
	secretKey: SECRET_KEY,
	apiUrl: API_URL,
	apiVersion: API_VERSION,
	jwtKey: JWT_KEY
});

import { constants } from '@clerk/backend/internal';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
import { env } from '$env/dynamic/private';

export const API_VERSION = env.CLERK_API_VERSION || 'v1';
export const SECRET_KEY = env.CLERK_SECRET_KEY || '';
export const PUBLISHABLE_KEY = PUBLIC_CLERK_PUBLISHABLE_KEY || '';
export const API_URL = env.CLERK_API_URL;
export const JWT_KEY = env.CLERK_JWT_KEY || '';

export const { Cookies, Headers } = constants;

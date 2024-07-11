import type { AuthObject } from '@clerk/backend/internal';

declare global {
	namespace App {
		interface Locals {
			auth: AuthObject;
		}
	}
}

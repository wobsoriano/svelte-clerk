import type { AuthObject } from '@clerk/backend';

declare global {
	namespace App {
		interface Locals {
			auth: AuthObject;
		}
	}
}

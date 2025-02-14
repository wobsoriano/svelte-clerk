import type { AuthObject, User } from '@clerk/backend';

declare global {
	namespace App {
		interface Locals {
			auth: AuthObject;
			currentUser: () => Promise<User | null>;
		}
	}
}

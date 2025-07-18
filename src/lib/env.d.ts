import type { SessionAuthObject, User } from '@clerk/backend';
import type { PendingSessionOptions } from '@clerk/types';

declare global {
	namespace App {
		interface Locals {
			auth: (options?: PendingSessionOptions) => SessionAuthObject;
		}
	}
}

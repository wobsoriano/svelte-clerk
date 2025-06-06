import type { User } from '@clerk/backend';
import type { SignedInAuthObject, SignedOutAuthObject } from '@clerk/backend/internal';
import type { PendingSessionOptions } from '@clerk/types';

declare global {
	namespace App {
		interface Locals {
			auth: (options?: PendingSessionOptions) => SignedInAuthObject | SignedOutAuthObject;
			currentUser: () => Promise<User | null>;
		}
	}
}

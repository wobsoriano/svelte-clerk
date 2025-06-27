import type { User } from '@clerk/backend';
import type { SignedInAuthObject, SignedOutAuthObject } from '@clerk/backend/internal';
import { clerkClient } from './clerkClient.js';
import { deprecated } from '@clerk/shared/deprecated';

export function createCurrentUser(auth: SignedInAuthObject | SignedOutAuthObject) {
	return async (): Promise<User | null> => {
		deprecated('currentUser()', 'Use `clerkClient.users.getUser(id)` instead.');
		if (!auth.userId) {
			return null;
		}

		const user = await clerkClient.users.getUser(auth.userId);
		return user;
	};
}

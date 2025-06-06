import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import type { SignedInAuthObject, SignedOutAuthObject } from '@clerk/backend/internal';

type SessionAuthObject = SignedInAuthObject | SignedOutAuthObject;

export class Security {
	private readonly auth: SessionAuthObject;

	constructor(private readonly event: RequestEvent) {
		this.auth = event.locals.auth();
	}

	isPublic() {
		if (this.auth.userId) {
			redirect(307, '/profile');
		}
		return this;
	}

	isAuthenticated() {
		if (!this.auth.userId) {
			redirect(307, '/sign-in');
		}
		return this;
	}

	hasPermission(permission: string) {
		const permitted = this.auth.has({ permission });
		if (!permitted) {
			error(403, 'missing permission: ' + permission);
		}
		return this;
	}

	hasRole(role: string) {
		const permitted = this.auth.has({ role });
		if (!permitted) {
			error(403, 'missing role: ' + role);
		}
		return this;
	}
}

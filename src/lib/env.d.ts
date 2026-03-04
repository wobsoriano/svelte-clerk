import type { SessionAuthObject } from '@clerk/backend';
import type { PendingSessionOptions } from '@clerk/shared/types';
import type { ClerkPageData, ClerkSvelteKitMiddlewareOptions } from './server/types.js';

declare global {
	namespace App {
		interface Locals {
			auth: (options?: PendingSessionOptions) => SessionAuthObject;
			__internal_clerk_config: ClerkSvelteKitMiddlewareOptions;
		}
		interface PageData {
			__clerk?: ClerkPageData;
		}
	}
}

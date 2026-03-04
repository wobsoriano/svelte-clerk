// See https://kit.svelte.dev/docs/types#app
import type { Security } from './hooks.server';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			security: Security;
			__internal_clerk_config: any;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

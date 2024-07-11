import { getContext, setContext } from 'svelte';
import type { ClerkContext } from './types.js';

/**
 * Creates a context.
 */
export function createContext<T>(key: symbol) {
	return {
		get: () => getContext<T>(key),
		set: (ctx: T) => setContext(key, ctx)
	};
}

export const clerkContext = createContext<ClerkContext>(Symbol('CLERK'));

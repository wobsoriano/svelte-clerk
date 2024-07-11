import { parsePublishableKey } from '@clerk/shared/keys';
import { loadScript } from '@clerk/shared/loadScript';

import type { ClerkInitOptions } from './types.js';

const FAILED_TO_LOAD_ERROR = 'Clerk: Failed to load Clerk';

export const loadClerkJsScript = async (opts: ClerkInitOptions) => {
	const { publishableKey } = opts;

	if (!publishableKey) {
		throw new Error('ClerkService requires a publishableKey');
	}

	return loadScript(clerkJsScriptUrl(opts), {
		async: true,
		crossOrigin: 'anonymous',
		beforeLoad: applyClerkJsScriptAttributes(opts)
	}).catch(() => {
		throw new Error(FAILED_TO_LOAD_ERROR);
	});
};

const clerkJsScriptUrl = (opts: ClerkInitOptions) => {
	const { clerkJSUrl, clerkJSVariant, clerkJSVersion = '5', publishableKey } = opts;

	if (clerkJSUrl) {
		return clerkJSUrl;
	}

	const scriptHost = parsePublishableKey(publishableKey)?.frontendApi || '';
	const variant = clerkJSVariant ? `${clerkJSVariant.replace(/\.+$/, '')}.` : '';
	return `https://${scriptHost}/npm/@clerk/clerk-js@${clerkJSVersion}/dist/clerk.${variant}browser.js`;
};

const applyClerkJsScriptAttributes = (options: ClerkInitOptions) => (script: HTMLScriptElement) => {
	const { publishableKey } = options;
	if (publishableKey) {
		script.setAttribute('data-clerk-publishable-key', publishableKey);
	}
};

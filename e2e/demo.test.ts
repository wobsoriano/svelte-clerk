import { test } from '@playwright/test';
import { createClerkTestUtils } from './utils';

const USER_EMAIL = process.env.E2E_CLERK_USER_USERNAME as string;
const USER_PASSWORD = process.env.E2E_CLERK_USER_PASSWORD as string;

if (!USER_EMAIL || !USER_PASSWORD) {
	throw new Error('E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD must be set');
}

test('protect page from unauthenticated users', async ({ page }) => {
	const clerk = createClerkTestUtils(page);
	await page.goto('/dashboard');
	await page.waitForURL('/sign-in');
	await clerk.signIn.waitForMounted();
});

test('sign in and navigate to a protected page', async ({ page }) => {
	const clerk = createClerkTestUtils(page);

	await page.goto('/sign-in');
	await clerk.signIn.waitForMounted();
	await clerk.signIn.signInWithEmailAndInstantPassword({
		email: USER_EMAIL,
		password: USER_PASSWORD
	});
	await clerk.expect.toBeSignedIn();
	await page.waitForURL('/profile');
	await clerk.userProfile.waitForMounted();
	await clerk.userButton.triggerSignOut();
});

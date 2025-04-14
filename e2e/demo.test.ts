import { test } from '@playwright/test';
import { createClerkTestUtils } from './utils';

const USER_EMAIL = process.env.E2E_CLERK_USER_USERNAME as string;
const USER_PASSWORD = process.env.E2E_CLERK_USER_PASSWORD as string;

test.afterEach(async ({ page }) => {
	await page.context().clearCookies();
});

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
	await page.waitForURL('/profile');
	await clerk.expect.toBeSignedIn();
	await clerk.userProfile.waitForMounted();
	await clerk.userButton.triggerSignOut();
});

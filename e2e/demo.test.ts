import { expect, test } from '@playwright/test';
import { createClerkTestUtils } from './utils';

const USER_EMAIL = process.env.E2E_CLERK_USER_USERNAME;
const USER_PASSWORD = process.env.E2E_CLERK_USER_PASSWORD;

if (!USER_EMAIL || !USER_PASSWORD) {
	throw new Error('E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD must be set');
}

test.describe.configure({ mode: 'parallel' });

test('Clerk client loads on first visit', async ({ page }) => {
	const clerk = createClerkTestUtils(page);
	await page.goto('/');

	await clerk.waitForClerkJsLoaded();
	await clerk.expect.toBeSignedOut();
});

test('sign in with hash routing', async ({ page }) => {
	const clerk = createClerkTestUtils(page);

	await page.goto('/sign-in');
	await clerk.signIn.waitForMounted();

	await clerk.signIn.setIdentifier(USER_EMAIL);
	await clerk.signIn.continue();
	await page.waitForURL(`http://localhost:4173/sign-in#/factor-one`);

	await clerk.signIn.setPassword(USER_PASSWORD);
	await clerk.signIn.continue();

	await clerk.expect.toBeSignedIn();
});

test('renders user button', async ({ page }) => {
	const clerk = createClerkTestUtils(page);

	await page.goto('/sign-in');
	await clerk.signIn.waitForMounted();
	await clerk.signIn.signInWithEmailAndInstantPassword({
		email: USER_EMAIL,
		password: USER_PASSWORD
	});
	await page.waitForURL('/profile');
	await clerk.expect.toBeSignedIn();

	await page.goto('/');

	await clerk.userButton.waitForMounted();
	await clerk.userButton.toggleTrigger();
	await clerk.userButton.waitForPopover();

	await clerk.userButton.toHaveVisibleMenuItems([/Manage account/i, /Sign out$/i]);

	await clerk.userButton.triggerManageAccount();
	await clerk.userProfile.waitForUserProfileModal();

	await expect(page.getByText(/profile details/i)).toBeVisible();
});

test('renders user profile', async ({ page }) => {
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
});

test('redirects to sign-in when unauthenticated', async ({ page, context }) => {
	const clerk = createClerkTestUtils(page);

	await page.goto('/profile');
	await page.waitForURL('http://localhost:4173/sign-in');
	await clerk.signIn.waitForMounted();
});

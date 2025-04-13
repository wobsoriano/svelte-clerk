import { test } from '@playwright/test';
import { ClerkPage } from './common';

const USER_EMAIL = process.env.E2E_CLERK_USER_USERNAME as string;
const USER_PASSWORD = process.env.E2E_CLERK_USER_PASSWORD as string;

test('protect page from unauthenticated users', async ({ page }) => {
	const clerk = new ClerkPage(page);
	await page.goto('/dashboard');
	await page.waitForURL('/sign-in');
	await clerk.waitForSignInMounted();
});

test('sign in and navigate to a protected page', async ({ page }) => {
	const clerk = new ClerkPage(page);
	
	await page.goto('/sign-in');
	await clerk.waitForSignInMounted();
	await clerk.signInWithEmailAndPassword(USER_EMAIL, USER_PASSWORD);
	await clerk.toBeSignedIn();
	await page.waitForURL('/profile');
	await clerk.waitForUserProfileMounted();
});

test('sign out', async ({ page }) => {
	const clerk = new ClerkPage(page);
	
	await page.goto('/sign-in');
	await clerk.waitForSignInMounted();
	await clerk.signInWithEmailAndPassword(USER_EMAIL, USER_PASSWORD);
	await clerk.toBeSignedIn();
	await page.waitForURL('/profile');
	await clerk.waitForUserProfileMounted();

	await clerk.signOut();
});

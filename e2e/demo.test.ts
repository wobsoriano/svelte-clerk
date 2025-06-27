import 'dotenv/config'
import { expect, test } from '@playwright/test';
import { createPageObjects } from '@clerk/testing/playwright/unstable';

const USER_EMAIL = process.env.E2E_CLERK_USER_USERNAME;
const USER_PASSWORD = process.env.E2E_CLERK_USER_PASSWORD;

if (!USER_EMAIL || !USER_PASSWORD) {
	throw new Error('E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD must be set');
}

test.describe.configure({ mode: 'parallel' });

test('Clerk client loads and sign in button renders', async ({ page, baseURL }) => {
	const po = createPageObjects({ page, baseURL });
	await po.page.goToAppHome();
  await po.page.waitForClerkJsLoaded();
  await po.expect.toBeSignedOut();
  await expect(po.page.getByRole('link', { name: /Sign in/i })).toBeVisible();
});

test('render user button component when user completes sign in flow', async ({ page, baseURL }) => {
  const po = createPageObjects({ page, baseURL });
  await po.page.goToRelative('/sign-in');
  await po.signIn.waitForMounted();
  await po.signIn.signInWithEmailAndInstantPassword({ email: USER_EMAIL, password: USER_PASSWORD });
  await po.expect.toBeSignedIn();

  await po.page.waitForAppUrl('/profile');
  await po.userButton.waitForMounted();
  await po.userButton.toggleTrigger();
  await po.userButton.waitForPopover();
});

test('render user profile and current user data', async ({ page, baseURL }) => {
  const po = createPageObjects({ page, baseURL });
  await po.page.goToRelative('/sign-in');
  await po.signIn.waitForMounted();
  await po.signIn.signInWithEmailAndInstantPassword({ email: USER_EMAIL, password: USER_PASSWORD });
  await po.expect.toBeSignedIn();

  await po.page.waitForAppUrl('/profile');
  await po.userProfile.waitForMounted();
  await expect(po.page.getByText(`User ID: ${USER_EMAIL}`)).toBeVisible();
});

test('redirects to sign-in when unauthenticated', async ({ page, baseURL }) => {
  const po = createPageObjects({ page, baseURL });
  await po.page.goToRelative('/profile');
  await po.page.waitForURL(`${baseURL}/sign-in`);
  await po.signIn.waitForMounted();
});

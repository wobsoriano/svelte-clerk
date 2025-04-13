import { clerk, setupClerkTestingToken, clerkSetup } from '@clerk/testing/playwright';
import { test } from '@playwright/test';
import { test as setup } from '@playwright/test'

setup('global setup', async ({}) => {
  await clerkSetup()
})

test('protect page from unauthenticated users', async ({ page }) => {
  await setupClerkTestingToken({ page });

	await page.goto('/dashboard');
	await page.waitForSelector("h1:has-text('Sign in')");
});

test('sign in and navigate to a protected page', async ({ page }) => {
  await setupClerkTestingToken({ page });

	await page.goto('/sign-in');
  await clerk.signIn({
    page,
    signInParams: {
      strategy: 'password',
      identifier: process.env.E2E_CLERK_USER_USERNAME!,
      password: process.env.E2E_CLERK_USER_PASSWORD!,
    },
  });

  await page.goto('/dashboard');

  await page.waitForSelector("h1:has-text('Dashboard')");
});

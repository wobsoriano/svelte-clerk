import { expect, type Page } from '@playwright/test';

export function createClerkTestUtils(page: Page) {
	const common = {
		getIdentifierField() {
			return page.locator('input[name=identifier]');
		},
		getPasswordField() {
			return page.locator('input[name=password]');
		}
	};

	const userButton = {
		async waitForMounted() {
			return page.waitForSelector('.cl-userButtonTrigger', { state: 'attached' });
		},
		toggleTrigger() {
			return page.locator('.cl-userButtonTrigger').click();
		},
		async waitForPopover() {
			return page.waitForSelector('.cl-userButtonPopoverCard', { state: 'visible' });
		},
		async triggerSignOut() {
			await userButton.waitForMounted();
			await userButton.toggleTrigger();
			await userButton.waitForPopover();
			return page.getByRole('menuitem', { name: /Sign out$/i }).click();
		}
	};

	const signIn = {
		...common,
		getContinueButton() {
			return page.getByRole('button', { name: 'Continue', exact: true });
		},
		async waitForMounted() {
			return page.waitForSelector('.cl-signIn-root', { state: 'attached' });
		},
		async setInstantPassword(password: string) {
			const passField = signIn.getPasswordField();
			await expect(passField).toBeVisible();
			await passField.fill(password, { force: true });
		},
		async signInWithEmailAndInstantPassword(opts: { email: string; password: string }) {
			const identifierField = signIn.getIdentifierField();
			await expect(identifierField).toBeVisible();
			await identifierField.fill(opts.email);
			await signIn.setInstantPassword(opts.password);
			await signIn.getContinueButton().click();
		}
	};

	const userProfile = {
		getUserButton() {
			return page.locator('.cl-userButtonTrigger');
		},
		waitForMounted() {
			return page.waitForSelector('.cl-userProfile-root', { state: 'attached' });
		}
	};

	const expect = {
		toBeSignedIn() {
			// @ts-ignore
			return page.waitForFunction(() => !!window.Clerk?.user);
		}
	};

	return {
		signIn,
		userButton,
		userProfile,
		expect
	};
}

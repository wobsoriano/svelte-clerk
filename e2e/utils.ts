import { expect, type Page } from '@playwright/test';

export function createClerkTestUtils(page: Page) {
	const common = {
		getIdentifierInput() {
			return page.locator('input[name=identifier]');
		},
		getPasswordInput() {
			return page.locator('input[name=password]');
		},
		getContinueButton() {
			return page.getByRole('button', { name: 'Continue', exact: true });
		},
		setIdentifier(val: string) {
			return common.getIdentifierInput().fill(val);
		},
		setPassword(val: string) {
			return common.getPasswordInput().fill(val);
		},
		continue() {
			return common.getContinueButton().click();
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
		},
		async toHaveVisibleMenuItems(menuItems: string | RegExp | Array<string | RegExp>) {
			if (typeof menuItems === 'string' || menuItems instanceof RegExp) {
				menuItems = [menuItems];
			}
			for (const menuItem of menuItems) {
				await expect(page.getByRole('menuitem', { name: menuItem })).toBeVisible();
			}
		},
		triggerManageAccount() {
			return page.getByRole('menuitem', { name: /Manage account/i }).click();
		}
	};

	const signIn = {
		...common,
		async waitForMounted() {
			return page.waitForSelector('.cl-signIn-root', { state: 'attached' });
		},
		async setInstantPassword(password: string) {
			const passField = signIn.getPasswordInput();
			await expect(passField).toBeVisible();
			await passField.fill(password, { force: true });
		},
		async signInWithEmailAndInstantPassword(opts: { email: string; password: string }) {
			const identifierField = signIn.getIdentifierInput();
			await expect(identifierField).toBeVisible();

			await identifierField.fill(opts.email);
			await signIn.setInstantPassword(opts.password);
			await signIn.continue();
		}
	};

	const userProfile = {
		waitForMounted() {
			return page.waitForSelector('.cl-userProfile-root', { state: 'attached' });
		},
		waitForUserProfileModal(state?: 'open' | 'closed') {
			return page.waitForSelector('.cl-modalContent:has(.cl-userProfile-root)', {
				state: state === 'closed' ? 'detached' : 'attached'
			});
		}
	};

	const expectClerk = {
		toBeSignedIn() {
			// @ts-ignore
			return page.waitForFunction(() => !!window.Clerk?.user);
		},
		toBeSignedOut(args?: { timeOut: number }) {
			return page.waitForFunction(
				() => {
					// @ts-ignore
					return !window.Clerk?.user;
				},
				null,
				{ timeout: args?.timeOut }
			);
		}
	};

	return {
		signIn,
		userButton,
		userProfile,
		expect: expectClerk,
		waitForClerkJsLoaded() {
			// @ts-ignore
			return page.waitForFunction(() => window.Clerk?.loaded);
		}
	};
}

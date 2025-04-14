import { type Page, type Locator, expect } from '@playwright/test';

export class ClerkPage {
	readonly page: Page;
	readonly identifierField: Locator;
	readonly passwordField: Locator;
	readonly continueButton: Locator;
	readonly userButton: Locator;
	readonly signOutButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.identifierField = page.locator('input[name=identifier]');
		this.passwordField = page.locator('input[name=password]');
		this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
		this.userButton = page.locator('.cl-userButtonTrigger');
		this.signOutButton = page.getByRole('menuitem', { name: /Sign out$/i });
	}

	getIdentifierInput() {
		return this.page.locator('input[name=identifier]');
	}

	getPasswordInput() {
		return this.page.locator('input[name=password]');
	}

	async setInstantPassword (val: string) {
    const passField = this.getPasswordInput();
    await expect(passField).toBeVisible();
    await passField.fill(val, { force: true });
  }

	async waitForSignInMounted() {
		await this.page.waitForSelector('.cl-signIn-root', { state: 'attached' });
	}

	async waitForUserProfileMounted() {
		await this.page.waitForSelector('.cl-userProfile-root', { state: 'attached' });
	}

	async waitForUserButton() {
		await this.page.waitForSelector('.cl-userButtonTrigger', { state: 'attached' });
	}

	async waitForPopover() {
		await this.page.waitForSelector('.cl-userButtonPopoverCard', { state: 'visible' });
	}

	async toBeSignedIn() {
		// @ts-ignore
		await this.page.waitForFunction(() => !!window.Clerk?.user);
	}

	async continue() {
	 return this.page.getByRole('button', { name: 'Continue', exact: true }).click()
	}

	async signInWithEmailAndPassword(email: string, password: string) {
    const identifierInput = this.getIdentifierInput();
    await expect(identifierInput).toBeVisible();

    await identifierInput.fill(email);
    await this.setInstantPassword(password);
    await this.continue();
	}

	async toggleUserButton() {
		await this.userButton.click();
	}

	async signOut() {
		await this.waitForUserButton();
		await this.toggleUserButton();
		await this.waitForPopover();
		await this.signOutButton.click();
	}
}

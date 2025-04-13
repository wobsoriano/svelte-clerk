import type { Page, Locator } from '@playwright/test';

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

  async signInWithEmailAndPassword(email: string, password: string) {
    await this.identifierField.fill(email);
    await this.passwordField.fill(password, { force: true });
    await this.continueButton.click();
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

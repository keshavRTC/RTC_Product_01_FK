import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class FooterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async clickHeader(headerText: string) {
    const selector = `//div[@class="menu-main-container"]//a[normalize-space()='${headerText}']`;
    const headerLocator = await this.getLocator(selector);
    await expect(headerLocator).toBeVisible({ timeout: 5000 });
    await headerLocator.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateURL(expectedSlug: string) {
    console.log("Validating URL for slug:", expectedSlug);
    await this.page.waitForLoadState('networkidle');
    const currentURL = this.page.url();
    console.log("Current URL:", currentURL);
    console.log("Expected Slug:", expectedSlug);
    expect(currentURL).toContain(expectedSlug);
  }

  async goToHome() {
    await this.page.goto('https://www.rtctek.com');
  }
}

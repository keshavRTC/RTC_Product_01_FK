import { Page ,  expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HeaderPage extends BasePage {
  constructor(page:Page) {
    super(page);
  }

  private buildSelector(headerText: string): string {
    switch (headerText) {
      case 'Contact Us':
        return 'a[href="/contact-us/"]';
      case '':
        return '//div[@data-id="6a765d9"]//a[normalize-space() = ""]';
      case 'Apply Now':
        return '//div[@data-id="6a765d9"]//a[@href="https://rtctek.com/apply-now"]';
      case 'Get a Quote':
        return `//div[@data-id='6a765d9']//a[normalize-space()='Get a Quote']`;
      default:
        // Playwright role selector format
        return `role=link[name="${headerText}"][exact=true]`;
    }
  }

  // Click menu header
  async clickHeader(headerText: string) {
    const selector = this.buildSelector(headerText);
    const headerLocator = await this.getLocator(selector);
    await expect(headerLocator).toBeVisible();
    await headerLocator.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Hover menu header
  async hoverHeader(headerText: string) {
    const selector = this.buildSelector(headerText);
    const headerLocator = await this.getLocator(selector);
    await expect(headerLocator).toBeVisible();
    await headerLocator.hover();
    await this.page.waitForLoadState('networkidle');
  }

  // Click submenu link
  async clickSubmenuLink(hrefSlug: string) {
    const selector = `//div[@data-id='6a765d9']//a[@href="https://rtctek.com${hrefSlug}"]`;
    const submenuLocator = await this.getLocator(selector);
    await expect(submenuLocator).toBeVisible();
    await submenuLocator.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateURL(expectedSlug: string) {
    await this.page.waitForLoadState('networkidle');
    const currentURL = this.page.url();
    expect(currentURL).toContain(expectedSlug);
  }

  async goToHome() {
    await this.page.goto('https://www.rtctek.com');
  }
}

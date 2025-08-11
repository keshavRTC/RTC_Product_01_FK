import { Page, Locator } from '@playwright/test';
import { getLocatorFromAI } from '../utils/aiLocatorHelper';

export class BasePage {
  protected page: Page;
  private maxRetries = 3;

  constructor(page: Page) {
    this.page = page;
  }

  async getLocator(locatorSelector: string): Promise<Locator> {
    let currentSelector = locatorSelector;
    let attempt = 0;

    while (attempt < this.maxRetries) {
      try {
        const locator = this.page.locator(currentSelector);
        await locator.first().waitFor({ state: 'visible', timeout: 3000 });
        return locator;
      } catch (err) {
        console.warn(`❌ Locator failed on attempt ${attempt + 1}: ${currentSelector}`);
        attempt++;

        const domHtml = await this.page.content();

        try {
          const aiResult = await getLocatorFromAI(currentSelector, domHtml);

          if (aiResult.newLocator && aiResult.newLocator !== currentSelector) {
            console.log(`🤖 AI suggested new locator: ${aiResult.newLocator}`);
            console.log(`📌 Reason: ${aiResult.reason || 'No reason provided'}`);
            currentSelector = aiResult.newLocator;
          } else {
            console.warn('🤖 AI could not suggest a different locator.');
            break;
          }
        } catch (apiError) {
          console.error('⚠️ AI API call failed:', apiError);
          break;
        }
      }
    }

    throw new Error(`❌ Could not find working locator after ${this.maxRetries} attempts: ${locatorSelector}`);
  }
}

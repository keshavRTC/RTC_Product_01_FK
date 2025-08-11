import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { JsonLocatorReader } from '../utils/jsonLocatorReader';
import path from 'path';

const jsonPath = path.resolve(__dirname, '../locators/body.json');
const reader = new JsonLocatorReader(jsonPath);
const locators = reader.getHeaders();

export class NavigationPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async gotoHome() {
    await this.page.goto('https://rtctek.com/');
  }

  async clickApplyNow() {
    const locator = await this.getLocator(locators.apply.applyBtnClick);
    await locator.click();
  }

  get applyForm(): Promise<Locator> {
    return this.getLocator(locators.apply.formVisible);
  }

  async clickContactUs() {
    const locator = await this.getLocator(locators.contact.clickOnContactUs);
    await locator.click();
  }

  get contactForm(): Promise<Locator> {
    return this.getLocator(locators.contact.form);
  }

  get indiaOfficeTab(): Promise<Locator> {
    return this.getLocator(locators.contact["India Office"]);
  }

  get indiaOfficeText(): Promise<Locator> {
    return this.getLocator(locators.contact.indianOfficeText);
  }

  get mapSection(): Promise<Locator> {
    return this.getLocator(locators.contact.findUsOnMap);
  }

  async clickAboutUs() {
    const locator = await this.getLocator(locators.about.clickonAboutUs);
    await locator.click();
  }

  async clickContactInsideAbout() {
    const locator = await this.getLocator(locators.about["Contact Us"]);
    await locator.click();
  }

  get rightBtn(): Promise<Locator> {
    return this.getLocator(locators.about.rightButton);
  }

  get leftBtn(): Promise<Locator> {
    return this.getLocator(locators.about.leftButton);
  }

  get article(): Promise<Locator> {
    return this.getLocator('article');
  }

  get hoverDevOps(): Promise<Locator> {
    return this.getLocator(locators.about.hovering);
  }

  get hoverText(): Promise<Locator> {
    return this.getLocator(locators.about.hoveringText);
  }

  async clickGetAQuote() {
    const locator = await this.getLocator(locators.getAQuote.clickOnGetAQuote);
    await locator.click();
  }

  get quoteForm(): Promise<Locator> {
    return this.getLocator(locators.getAQuote.quoteFormVisible);
  }
}

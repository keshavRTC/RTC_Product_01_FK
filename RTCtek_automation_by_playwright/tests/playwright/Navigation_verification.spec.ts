import { test, expect } from '@playwright/test';
import { JsonLocatorReader } from 'utils/jsonLocatorReader';
import path from 'path';
import { NavigationPage } from '../../src/pages/navigationPage';

const jsonPath = path.resolve(__dirname, '../../src/locators/body.json');
const jsonReader = new JsonLocatorReader(jsonPath);
const footerLocators = jsonReader.getHeaders();

test.describe('Apply Now Page', () => {
  test('Form should be visible', async ({ page }) => {
  const navPage = new NavigationPage(page);
  await navPage.gotoHome();
  await navPage.clickApplyNow();

  await page.waitForLoadState('networkidle');

  // Access the iframe correctly using CSS selector (XPath not allowed in frameLocator)
  const frame = page.frameLocator('iframe[src="https://forms.office.com/r/mhEP8ik6Ff"]');

  // Form locator inside iframe
  const formVisibleLocator = frame.locator(footerLocators.apply.formVisible); // make sure this locator is correct

  // Scroll and check visibility
  await formVisibleLocator.scrollIntoViewIfNeeded();
  await expect(formVisibleLocator).toBeVisible();
});
  });


test.describe('Contact Us Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rtctek.com/');
    await page.waitForLoadState('networkidle');
  });

  test('Contact form should be visible', async ({ page }) => {
  
    await page.locator(footerLocators.contact.clickOnContactUs).click();
    //await page.waitForLoadState('networkidle');
    await expect(page.locator(footerLocators.contact.form)).toBeVisible();
  });

  test('Click on India Office tab and check text', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.locator(footerLocators.contact.clickOnContactUs).click();
    //await page.waitForLoadState('networkidle');
    await page.locator(footerLocators.contact["India Office"]).click();
    await expect(page.locator(footerLocators.contact.indianOfficeText)).toBeVisible();
  });

  test('Find us on map section should be visible', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.locator(footerLocators.contact.clickOnContactUs).click();
    //await page.waitForLoadState('networkidle');
    await page.locator(footerLocators.contact.findUsOnMap).scrollIntoViewIfNeeded();
    await expect(page.locator(footerLocators.contact.findUsOnMap)).toBeVisible();// element not found . 
  });
});

test.describe('About Us Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://rtctek.com/');
    await page.waitForLoadState('networkidle');
    
  });

  test('Click Contact Us inside About, validate and go back', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.locator(footerLocators.about.clickonAboutUs).click();
    await page.waitForLoadState('networkidle');
    await page.locator(footerLocators.about["Contact Us"]).click();
    //await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*contact-us/);
    await page.goBack();
  });

  test('Click right and left slider', async ({ page }) => {
    await page.locator(footerLocators.about.clickonAboutUs).click();
    await page.waitForLoadState('networkidle');
    await page.locator(footerLocators.about.rightButton).scrollIntoViewIfNeeded();
    await page.locator(footerLocators.about.rightButton).click();

    await page.locator(footerLocators.about.leftButton).scrollIntoViewIfNeeded();
    await page.locator(footerLocators.about.leftButton).click();// test timout 3000 exceeded 
    
    await expect(page.locator(footerLocators.about.hoveringText)).toBeVisible(); // fallback
  });

  test('Hover on DevOps Solution and validate info', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.locator(footerLocators.about.clickonAboutUs).click();
    await page.waitForLoadState('networkidle');
    await page.locator(footerLocators.about.hovering).scrollIntoViewIfNeeded() ;
    await page.locator(footerLocators.about.hovering).hover();
    await expect(page.locator(footerLocators.about.devopshoveringText)).toBeVisible(); // test timeout 3000 exceeded
  });
});

// test.describe('Get a Quote Page', () => {
//   test('Form should be visible', async ({ page }) => {
//     await page.goto('https://rtctek.com/');
//     await page.waitForLoadState('networkidle');
//     await page.locator(footerLocators.getAQuote.clickOnGetAQuote).click();
//     //await page.waitForLoadState('networkidle');
//     await expect(page.locator(footerLocators.getAQuote.quoteFormVisible)).toBeVisible();
//   });

  test.describe('Get a Quote Page', () => {
  test('Form should be visible', async ({ page }) => {
    await page.goto('https://www.adobe.com/acrobat/pdf-reader.html');
    //await page.waitForLoadState('networkidle');
    const loc = await page.locator('xpath=//merch-card[@class="merch-card mini-compare-chart add-addon-genai individual"]//slot[@name="heading-m-price"]');
    await page.locator('xpath = //h2[@id="compare-acrobat-plans"]').scrollIntoViewIfNeeded()  ; 
    
    await loc.click();
    //await page.waitForLoadState('networkidle');
    //await expect(page.locator(footerLocators.getAQuote.quoteFormVisible)).toBeVisible();
  });
  });

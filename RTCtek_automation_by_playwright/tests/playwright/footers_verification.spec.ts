import { test, expect } from '@playwright/test';
import { FooterPage } from 'pages/footerPage';
import { JsonLocatorReader } from 'utils/jsonLocatorReader';
import path from 'path';

const jsonPath = path.resolve(__dirname, '../../src/locators/footer.json');
const jsonReader = new JsonLocatorReader(jsonPath);
const footers = jsonReader.getHeaders();

console.log("footers data:", footers);


test.describe('Footer  Validation', () => {

  for (const footerKey in footers) {
    const footer = footers[footerKey];

    
    if (footer.text) {
      test(`Validate header: ${footer.text}`, async ({ page }) => {
        const footerPage = new FooterPage(page);
        await footerPage.goToHome();
        await footerPage.clickHeader(footer.text);
        await footerPage.validateURL(footer.hrefSlug);
        console.log(`Header "${footer.text}" validated.`);
      });
    }

   
   
  }
});

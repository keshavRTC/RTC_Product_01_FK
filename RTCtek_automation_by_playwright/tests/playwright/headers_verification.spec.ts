
import { test, expect } from '@playwright/test';
import { HeaderPage } from 'pages/headerPage';
import { JsonLocatorReader } from 'utils/jsonLocatorReader';
import path from 'path';

const jsonPath = path.resolve(__dirname, '../../src/locators/headers.json');
const jsonReader = new JsonLocatorReader(jsonPath);
const headers = jsonReader.getHeaders();

test.describe('Header and Submenu Validation', () => {

  for (const headerKey in headers) {
    const header = headers[headerKey];

    // Test for Header (only if not empty and no submenu)
    if (header.text && !header.hasSubmenu) {
      test(`Validate header: ${header.text}`, async ({ page }) => {
        const headerPage = new HeaderPage(page);
        await headerPage.goToHome();
        await headerPage.clickHeader(header.text);
        await headerPage.validateURL(header.hrefSlug);
        console.log(`Header "${header.text}" validated.`);
      });
    }

    // Test for each submenu link
    if (header.text && header.hasSubmenu) {
      const submenuItems = header.submenu;
      for (const submenuKey in submenuItems) {
        const submenu = submenuItems[submenuKey];

        test(`Validate submenu: ${header.text} > ${submenu.text}`, async ({ page }) => {
          const headerPage = new HeaderPage(page);
          await headerPage.goToHome();
          await headerPage.hoverHeader(header.text);
          await headerPage.clickSubmenuLink(submenu.hrefSlug);
          await headerPage.validateURL(submenu.hrefSlug);
          console.log(`Submenu link "${submenu.text}" under "${header.text}" validated.`);
        });
      }
    }
  }
});

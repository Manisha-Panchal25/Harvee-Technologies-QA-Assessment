
const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');

const users = require('../test_data/users');

const { captureStep } = require('../utils/screenshotHelper');
require('../utils/hooks');

// TC22 - Verify logged-out user cannot access Products page directly
test('TC22 - Verify logged-out user cannot access Products page directly', async ({ page }) => {

  const loginPage = new LoginPage(page);

  // Step 1: Open application
  await loginPage.open();
  await captureStep(page, test.info(), 'Step 1 - Login Page');

  // Step 2: Login with valid credentials
  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await expect(page).toHaveURL(/inventory.html/);
  await captureStep(page, test.info(), 'Step 2 - Successful Login');

  // Step 3: Logout
  const productsPage = new ProductsPage(page);

  await productsPage.logout();

  await expect(loginPage.loginButton).toBeVisible();
  await captureStep(page, test.info(), 'Step 3 - User Logged Out');

  // Step 4: Try opening Products page directly
  await page.goto('/inventory.html');
  await captureStep(page, test.info(), 'Step 4 - Direct Products URL Attempt');

  // Step 5: Verify user is redirected to login page
  await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  await expect(loginPage.loginButton).toBeVisible();

  await captureStep(page, test.info(), 'Step 5 - Access Denied and Redirected');

});

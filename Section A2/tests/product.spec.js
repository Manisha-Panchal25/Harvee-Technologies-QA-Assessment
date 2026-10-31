
const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');

const users = require('../test_data/users');
const { captureStep } = require('../utils/screenshotHelper');

require('../utils/hooks');

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await expect(page).toHaveURL(/inventory.html/);
});

// TC10 - Sort products by price low to high
test('TC10 - Verify products are sorted by price low to high', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  // Step 1: Verify products page after login
  await expect(page.locator('.title')).toHaveText('Products');
  await captureStep(page, test.info(), 'Step 1 - Products Page');

  // Step 2: Sort products by price low to high
  await productsPage.sortPriceLowToHigh();
  await captureStep(page, test.info(), 'Step 2 - Products Sorted Low to High');

  // Step 3: Verify sorted product prices
  const actualPrices = await productsPage.getProductPrices();

  const expectedPrices = [...actualPrices].sort(
    (a, b) => a - b
  );

  expect(actualPrices.length).toBeGreaterThan(1);
  expect(actualPrices).toEqual(expectedPrices);

  await captureStep(page, test.info(), 'Step 3 - Price Sorting Verified');
});


// TC14 - Add two products and remove one
test('TC14 - Add two products, remove one and verify cart', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  // Step 1: Verify products page
  await expect(page.locator('.title')).toHaveText('Products');
  await captureStep(page, test.info(), 'Step 1 - Products Page');

  // Step 2: Add first product
  await productsPage.addProduct('Sauce Labs Backpack');
  await captureStep(page, test.info(), 'Step 2 - First Product Added');

  // Step 3: Add second product
  await productsPage.addProduct('Sauce Labs Bike Light');

  await expect(productsPage.cartBadge).toHaveText('2');
  await captureStep(page, test.info(), 'Step 3 - Two Products Added');

  // Step 4: Remove first product
  await productsPage.removeProduct('Sauce Labs Backpack');

  await expect(productsPage.cartBadge).toHaveText('1');
  await captureStep(page, test.info(), 'Step 4 - First Product Removed');

  // Step 5: Open shopping cart
  await productsPage.openCart();
  await captureStep(page, test.info(), 'Step 5 - Shopping Cart');

  // Step 6: Verify remaining product
  const cartPage = new CartPage(page);

  await expect(cartPage.cartItems).toHaveCount(1);

  await expect(cartPage.itemNames).toHaveText([
    'Sauce Labs Bike Light'
  ]);

  await captureStep(page, test.info(), 'Step 6 - Cart Verification');
});

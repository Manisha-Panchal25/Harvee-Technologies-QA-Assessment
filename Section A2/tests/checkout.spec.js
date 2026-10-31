const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

require('../utils/hooks');
const { captureStep } = require('../utils/screenshotHelper');

const users = require('../test_data/users');

// Reusable method to reach the checkout overview page
async function goToCheckoutOverview(page) {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  const productsPage = new ProductsPage(page);

  await productsPage.addProduct('Sauce Labs Backpack');
  await productsPage.addProduct('Sauce Labs Bike Light');

  await productsPage.openCart();

  const cartPage = new CartPage(page);

  await cartPage.proceedToCheckout();

  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.fillInformation(
    'Manisha',
    'Tester',
    '132103'
  );

  await checkoutPage.continueCheckout();

  return checkoutPage;
}


// TC17 - Complete checkout and verify total calculation
test('TC17 - Complete checkout successfully', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Step 1: Open application
  await loginPage.open();
  await captureStep(page, test.info(), 'Step 1 - Login Page');

  // Step 2: Login
  await loginPage.login(users.standard.username, users.standard.password);
  await expect(page).toHaveURL(/inventory.html/);
  await captureStep(page, test.info(), 'Step 2 - Successful Login');

  // Step 3: Add products
  await productsPage.addProduct('Sauce Labs Backpack');
  await productsPage.addProduct('Sauce Labs Bike Light');
  await captureStep(page, test.info(), 'Step 3 - Products Added');

  // Step 4: Open cart
  await productsPage.openCart();
  await captureStep(page, test.info(), 'Step 4 - Shopping Cart');

  // Step 5: Proceed to checkout
  await cartPage.proceedToCheckout();
  await captureStep(page, test.info(), 'Step 5 - Checkout Information');

  // Step 6: Enter customer information
  await checkoutPage.fillInformation('Manisha', 'Tester', '132103');
  await checkoutPage.continueCheckout();
  await captureStep(page, test.info(), 'Step 6 - Checkout Overview');

  // Step 7: Verify total
  const amounts = await checkoutPage.getOrderAmounts();
  expect(amounts.total).toBe(amounts.subtotal + amounts.tax);
  await captureStep(page, test.info(), 'Step 7 - Price Verification');

  // Step 8: Finish order
  await checkoutPage.finishOrder();
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  await captureStep(page, test.info(), 'Step 8 - Order Completed');

});


// TC18 - Parameterized checkout validation test// TC18 - Parameterized checkout validation test
const checkoutValidationCases = [
  {
    field: 'First Name',
    firstName: null,
    lastName: 'Tester',
    postalCode: '132103',
    expectedError: 'Error: First Name is required'
  },
  {
    field: 'Last Name',
    firstName: 'Manisha',
    lastName: null,
    postalCode: '132103',
    expectedError: 'Error: Last Name is required'
  },
  {
    field: 'Postal Code',
    firstName: 'Manisha',
    lastName: 'Tester',
    postalCode: null,
    expectedError: 'Error: Postal Code is required'
  }
];

for (const scenario of checkoutValidationCases) {

  test(`TC18 - Verify error when ${scenario.field} is missing`, async ({ page }) => {

    const loginPage = new LoginPage(page);

    // Step 1: Open application
    await loginPage.open();
    await captureStep(page, test.info(), 'Step 1 - Login Page');

    // Step 2: Login
    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await expect(page).toHaveURL(/inventory.html/);
    await captureStep(page, test.info(), 'Step 2 - Successful Login');

    // Step 3: Add product
    const productsPage = new ProductsPage(page);

    await productsPage.addProduct('Sauce Labs Backpack');
    await captureStep(page, test.info(), 'Step 3 - Product Added');

    // Step 4: Open cart
    await productsPage.openCart();
    await captureStep(page, test.info(), 'Step 4 - Shopping Cart');

    // Step 5: Proceed to checkout
    const cartPage = new CartPage(page);

    await cartPage.proceedToCheckout();
    await captureStep(page, test.info(), 'Step 5 - Checkout Information');

    // Step 6: Fill checkout information
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillInformation(
      scenario.firstName,
      scenario.lastName,
      scenario.postalCode
    );

    await captureStep(page, test.info(), 'Step 6 - Checkout Form Filled');

    // Step 7: Click Continue and verify validation error
    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage)
      .toHaveText(scenario.expectedError);

    await captureStep(
      page,
      test.info(),
      `Step 7 - ${scenario.field} Validation Error`
    );

  });
}
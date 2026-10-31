
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const users = require('../test_data/users');

require('../utils/hooks');
const { captureStep } = require('../utils/screenshotHelper');

// TC01 - Standard user can log in successfully
test('TC01 - Standard user can log in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Step 1: Open application
  await loginPage.open();
  await captureStep(page, test.info(), 'Step 1 - Login Page');

  // Step 2: Enter credentials and login
  await loginPage.login(
    users.standard.username,
    users.standard.password
  );
  await captureStep(page, test.info(), 'Step 2 - Credentials Submitted');

  // Step 3: Verify successful login
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.title')).toHaveText('Products');
  await captureStep(page, test.info(), 'Step 3 - Successful Login');


});

// TC02 - Locked-out user receives an error
test('TC02 - Locked-out user receives an error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Step 1: Open application
  await loginPage.open();
  await captureStep(page, test.info(), 'Step 1 - Login Page');

  // Step 2: Submit locked-out user credentials
  await loginPage.login(
    users.locked.username,
    users.locked.password
  );
  await captureStep(page, test.info(), 'Step 2 - Locked User Login Attempt');

  // Step 3: Verify locked-out error
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('locked out');
  await captureStep(page, test.info(), 'Step 3 - Locked Out Error');


});

// TC03 - Invalid username is rejected
test('TC03 - Invalid username is rejected', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Step 1: Open application
  await loginPage.open();
  await captureStep(page, test.info(), 'Step 1 - Login Page');

  // Step 2: Submit invalid username
  await loginPage.login(
    users.invalid.username,
    users.invalid.password
  );
  await captureStep(page, test.info(), 'Step 2 - Invalid Username Attempt');

  // Step 3: Verify error message
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage)
    .toContainText('Username and password do not match');
  await captureStep(page, test.info(), 'Step 3 - Invalid Username Error');


});

// TC04 - Invalid password is rejected
test('TC04 - Invalid password is rejected', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Step 1: Open application
  await loginPage.open();
  await captureStep(page, test.info(), 'Step 1 - Login Page');

  // Step 2: Submit invalid password
  await loginPage.login(
    users.standard.username,
    'wrong_password'
  );
  await captureStep(page, test.info(), 'Step 2 - Invalid Password Attempt');

  // Step 3: Verify error message
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage)
    .toContainText('Username and password do not match');
  await captureStep(page, test.info(), 'Step 3 - Invalid Password Error');


});

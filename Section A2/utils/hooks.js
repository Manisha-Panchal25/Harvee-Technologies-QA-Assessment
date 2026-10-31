const { test } = require('@playwright/test');

test.afterEach(async ({ page }, testInfo) => {
  const screenshot = await page.screenshot({
    fullPage: true
  });

  await testInfo.attach('Test Screenshot', {
    body: screenshot,
    contentType: 'image/png'
  });
});
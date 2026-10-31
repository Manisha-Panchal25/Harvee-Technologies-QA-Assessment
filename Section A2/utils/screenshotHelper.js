async function captureStep(page, testInfo, stepName) {
  const screenshot = await page.screenshot({
    fullPage: true
  });

  await testInfo.attach(stepName, {
    body: screenshot,
    contentType: 'image/png'
  });

  console.log(`Screenshot captured: ${stepName}`);
}

module.exports = { captureStep };
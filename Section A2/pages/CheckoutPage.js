class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Checkout information
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');

    // Validation
    this.errorMessage = page.locator('[data-test="error"]');

    // Order summary
    this.subtotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');

    // Order completion
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
  }

  async fillInformation(firstName, lastName, postalCode) {
    if (firstName !== null) {
      await this.firstName.fill(firstName);
    }

    if (lastName !== null) {
      await this.lastName.fill(lastName);
    }

    if (postalCode !== null) {
      await this.postalCode.fill(postalCode);
    }
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async getErrorMessage() {
    return (await this.errorMessage.textContent()).trim();
  }

  async getAmountInCents(locator) {
    const text = await locator.textContent();
    const match = text.match(/\$([\d,]+\.\d{2})/);

    if (!match) {
      throw new Error(`Unable to read amount from: ${text}`);
    }

    return Math.round(
      Number(match[1].replace(',', '')) * 100
    );
  }

  async getOrderAmounts() {
    return {
      subtotal: await this.getAmountInCents(this.subtotal),
      tax: await this.getAmountInCents(this.tax),
      total: await this.getAmountInCents(this.total)
    };
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutPage };
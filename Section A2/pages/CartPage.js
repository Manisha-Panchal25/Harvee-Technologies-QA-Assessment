class CartPage {
  constructor(page) {
    this.page = page;

    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async getItemNames() {
    return await this.itemNames.allTextContents();
  }

  async removeProduct(productName) {
    const product = this.cartItems.filter({
      has: this.page.getByText(productName, { exact: true })
    });

    await product.locator('button').click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
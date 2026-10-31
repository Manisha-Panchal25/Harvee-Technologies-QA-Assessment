class ProductsPage {
  constructor(page) {
    this.page = page;

    this.title = page.locator('.title');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productCards = page.locator('.inventory_item');
    this.productPrices = page.locator('.inventory_item_price');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async sortPriceLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
  }

  async getProductPrices() {
    const prices = await this.productPrices.allTextContents();

    return prices.map(price =>
      Number(price.replace('$', '').trim())
    );
  }

  async addProduct(productName) {
    const product = this.productCards.filter({
      has: this.page.getByText(productName, { exact: true })
    });

    await product.locator('button').click();
  }

  async removeProduct(productName) {
    const product = this.productCards.filter({
      has: this.page.getByText(productName, { exact: true })
    });

    await product.locator('button').click();
  }

  async getCartCount() {
    if (await this.cartBadge.count() === 0) {
      return 0;
    }

    return Number(await this.cartBadge.textContent());
  }

  async openCart() {
    await this.cartLink.click();
  }
  async logout() {
  await this.page.locator('#react-burger-menu-btn').click();

  await this.page.locator('#logout_sidebar_link').click();
}
}

module.exports = { ProductsPage };
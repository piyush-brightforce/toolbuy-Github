export default class Product {
  constructor(data) {
    this.id = data?.ProductID || null;
    this.code = data?.ProductCode || '';
    this.title = data?.ProductTitle || '';
    this.slug = data?.ProductCodeSlug || '';
    this.listPrice = data?.ListPrice || 0;
    this.discountPercent = data?.DiscountPercent || 0;
    this.sellingPrice = data?.SellingPrice || 0;
  }

  get discountAmount() {
    return this.listPrice - this.sellingPrice;
  }
}

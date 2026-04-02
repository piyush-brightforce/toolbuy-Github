class ShoppingCartSummary {
  constructor(data = {}) {
    this.shoppingCartMasterID = data.ShoppingCartMasterID || null;
    this.cartSessionID = data.CartSessionID || "";
    this.productTitle = data.ProductTitle || "";
    this.listPrice = data.ListPrice || 0;
    this.sellingPrice = data.SellingPrice || 0;
    this.qty = data.Qty || 0;
    this.imageName = data.ImageName || "";
    this.imagePath = data.ImagePath || "";
    this.discountPercent = data.DiscountPercent || 0;
  }
}

class CartResult {
  constructor(data = {}) {
    this.shoppingCartSummary = Array.isArray(data.ShoppingCartSummary)
      ? data.ShoppingCartSummary.map(
          (item) => new ShoppingCartSummary(item)
        )
      : [];

    this.shoppingCartVariationDetails =
      data.ShoppingCartVariationDetails || null;
  }
}

class CartResponse {
  constructor(data = {}) {
    this.success = data.Success || false;
    this.message = data.Message || "";
    this.result = data.Result ? new CartResult(data.Result) : null;
  }
}

export default CartResponse;
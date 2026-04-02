
export class ShoppingCartResponse {
  constructor(data = {}) {
    this.success = data.Success ?? false;
    this.message = data.Message ?? null;

    const result = data.Result ?? {};

    this.shoppingCartList = Array.isArray(result.ShoppingCartList)
      ? result.ShoppingCartList.map(item => new ShoppingCartItem(item))
      : [];
      
    this.shoppingCartMaster = new ShoppingCartMaster(
      result.ShoppingCartMaster || {}
    );

    this.productVariation = result.ProductVariation || [];
    this.productVariationList = result.ProductVariationList || [];
  }
}

export class ShoppingCartMaster {
  constructor(data = {}) {
    this.masterID = data.ShoppingCartMasterID ?? 0;
    this.customerID = data.fkCustomerID ?? 0;
    this.shippingCharge = data.ShippingCharge ?? 0;
    this.isShippingFree = data.IsShipFree ?? false;
    this.totalPrice = data.TotalPrice ?? 0;
    this.gstPrice = data.GSTPrice ?? 0;
    this.roundOff = data.RoundOff ?? 0;
    this.totalOrder = data.TotalOrder ?? 0;
    this.totalItems = data.TotalItems ?? 0;
    this.sessionId = data.SessionID ?? ''
  }
}

export class ShoppingCartItem {
  constructor(data = {}) {
    this.shoppingCartID = data.ShoppingCartID ?? 0;
    this.productID = data.fkProductID ?? 0;
    this.qty = data.Qty ?? 0;
    this.productTitle = data.ProductTitle ?? "";
    this.productBrandModel = data.ProdBrandModel ?? "";
    this.productCode = data.ProductCode ?? "";
    this.productSlug = data.ProductCodeSlug ?? "";
    this.seriesTitle = data.SeriesTitle ?? "";
    this.listPrice = data.ListPrice ?? 0;
    this.sellingPrice = data.SellingPrice ?? 0;
    this.totalPrice = data.TotalPrice ?? 0;
    this.gstPrice = data.GSTPrice ?? 0;
    this.discountPercent = data.DiscountPercent ?? 0;
    this.sku = data.SKU ?? "";
    this.availableQty = data.AvailableQty ?? 0;
    this.productImage = data.ProductImage ?? "";
    this.productImagePath = data.ProductImagePath ?? "";
    this.deliveryCharge = data.DeliveryCharge ?? 0;
    this.packUnit = data.PackUnit ?? "";
    this.gstRate = data.GSTRate ?? 0;
    this.deliveryOnOff = data.DeliveryOnOff ?? false;
  }
}
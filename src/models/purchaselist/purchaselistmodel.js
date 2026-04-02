export class PurchaseListResponse {
  constructor(data = {}) {
    this.success = data.Success ?? false;
    this.message = data.Message ?? '';
    this.result = data.Result
      ? new PurchaseListResult(data.Result)
      : null;
  }
}

export class PurchaseListResult {
  constructor(data = {}) {
    this.purchaseList = Array.isArray(data.PurchaseList)
      ? data.PurchaseList.map(item => new PurchaseListMaster(item))
      : [];

    this.purchaseListProduct = Array.isArray(data.PurchaseListProduct)
      ? data.PurchaseListProduct.map(item => new PurchaseListProduct(item))
      : [];
  }
}

export class PurchaseListMaster {
  constructor(data = {}) {
    this.purchaseListMasterID = data.PurchaseListMasterID ?? 0;
    this.listName = data.ListName ?? '';
    this.totalProduct = data.TotalProduct ?? 0;
  }
}

export class PurchaseListProduct {
  constructor(data = {}) {
    this.productId = data.fkProductID ?? 0;
    this.purchaseListID = data.PurchaseListID ?? 0;
    this.purchaseListMasterID = data.fkPurchaseListMasterID ?? 0;

    this.createdDate = data.CreatedDate ?? null;
    this.listName = data.ListName ?? '';
    this.customerID = data.fkCustomerID ?? 0;
    this.sessionID = data.SessionID ?? null;

    this.productTitle = data.ProductTitle ?? '';
    this.productCode = data.ProductCode ?? '';
    this.productCodeSlug = data.ProductCodeSlug ?? '';

    this.productSeriesID = data.fkProductSeriesID ?? 0;
    this.sku = data.SKU ?? '';
    this.modelNo = data.ModelNo ?? '';

    this.listPrice = data.ListPrice ?? 0;
    this.discountPercent = data.DiscountPercent ?? 0;
    this.sellingPrice = data.SellingPrice ?? 0;

    this.qty = data.Qty ?? 0;
    this.availableQty = data.AvailableQty ?? 0;
    this.minOrderQty = data.MinOrderQty ?? 0;
    this.minCartQty = data.MinCartQty ?? 0;

    this.brandID = data.fkBrandID ?? 0;
    this.brandName = data.BrandName ?? '';

    this.imageName = data.ImageName ?? '';
    this.imagePath = data.ImagePath ?? '';

    this.cartProduct = data.CartProduct ?? 0;
    this.variation = data.fk_Variation ?? 0;
  }

  // ✅ Full Image URL (helper)
  get imageUrl() {
    return this.imagePath
      ? `https://api.toolbuy.com${this.imagePath}`
      : '';
  }

  // ✅ Discounted price label
  get displayPrice() {
    return `₹${this.sellingPrice}`;
  }
}
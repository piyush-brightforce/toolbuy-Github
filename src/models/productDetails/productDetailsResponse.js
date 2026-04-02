

export class ProductDetailResponseModel {
  constructor(data = {}) {
    this.success = data?.Success ?? false;
    this.message = data?.Message ?? null;
    this.result = new ProductDetailResult(data?.Result ?? {});
  }
}

class ProductDetailResult {
  constructor(data = {}) {
    this.productMaster = new ProductMaster(data?.ProductMaster || {});

    this.productImageList = (data?.ProductImageList || []).map(
      (item) => new ProductImage(item)
    );

    this.productSpecificationList = (data?.ProductSpecificationList || []).map(
      (item) => new ProductSpecification(item)
    );

    this.filterMasterList = (data?.FilterMasterList || []).map(
      (item) => new FilterMaster(item)
    );

    this.breadcrumb = (data?.BredCrumb || []).map(
      (item) => new BreadCrumb(item)
    );
  }
}

export class ProductMaster {
  constructor(data = {}) {
    this.productID = data.ProductID ?? 0;
    this.productCode = data.ProductCode ?? "";
    this.productTitle = data.ProductTitle ?? "";
    this.productCodeSlug = data.ProductCodeSlug ?? "";
    this.productSlag = data.ProductSlag ?? null;
    this.productType = data.ProductType ?? null;

    this.fkBrandID = data.fkBrandID ?? 0;

    this.imageName = data.ImageName ?? null;
    this.imagePath = data.ImagePath ?? null;

    this.brandName = data.BrandName ?? "";
    this.brandCode = data.BrandCode ?? "";
    this.brandLogo = data.BrandLogo ?? "";
    this.brandLogoPath = data.BrandLogoPath ?? "";

    this.mobileIcon = data.MobileIcon ?? "";
    this.mobileIconPath = data.MobileIconPath ?? "";

    this.categoryName = data.CategoryName ?? "";
    this.packUnit = data.PackUnit ?? "";

    this.fkProductSeriesID = data.fkProductSeriesID ?? 0;
    this.productSeries = data.ProductSeries ?? "";

    this.sku = data.SKU ?? "";
    this.modelNo = data.ModelNo ?? "";

    this.listPrice = data.ListPrice ?? 0;
    this.discountPercent = data.DiscountPercent ?? 0;
    this.sellingPrice = data.SellingPrice ?? 0;
    this.discountPrice = data.DiscountPrice ?? 0;
    this.gstPrice = data.GSTPrice ?? 0;
    this.mainPrice = data.MainPrice ?? 0;

    this.qty = data.Qty ?? 0;
    this.minPrice = data.MinPrice ?? 0;
    this.maxPrice = data.MaxPrice ?? 0;

    this.availableQty = data.AvailableQty ?? 0;
    this.minOrderQty = data.MinOrderQty ?? 1;

    this.weight = data.Weight ?? 0;
    this.weightUnit = data.WeightUnit ?? "";

    this.height = data.Height ?? 0;
    this.width = data.Width ?? 0;
    this.length = data.Length ?? 0;

    this.sizeUnitIn = data.SizeUnitIn ?? "";
    this.sizeUnitOnWeb = data.SizeUnitOnWeb ?? "";

    this.days = data.Days ?? 0;

    this.h1Title = data.H1Title ?? "";
    this.pageTitle = data.PageTitle ?? "";
    this.pageKeyword = data.PageKeyword ?? "";
    this.pageDescription = data.PageDescription ?? "";

    this.shortDescr = data.ShortDescr ?? "";
    this.longDescr = data.LongDescr ?? "";

    this.fkGSTRateID = data.fkGSTRateID ?? 0;
    this.gstRate = data.GSTRate ?? 0;

    this.cartProduct = data.CartProduct ?? 0;
    this.purchaseListID = data.PurchaseListID ?? 0;

    this.videoName = data.VideoName ?? "";
    this.youtubeVideo = data.YoutubeVideo ?? "";

    this.deliveryCharge = data.DeliveryCharge ?? 0;
    this.deliveryDays = data.DeliveryDays ?? 0;

    this.hsnCode = data.HsnCode ?? "";

    this.isSeries = data.IsSeries ?? false;
    this.fkVariation = data.fk_Variation ?? 0;
  }
}

// class ProductMaster {
//   constructor(data = {}) {
//     this.productID = data.ProductID || 0;
//     this.productCode = data.ProductCode || "";
//     this.productTitle = data.ProductTitle || "";
//     this.productCodeSlug = data.ProductCodeSlug || "";
//     this.productSlag = data.ProductSlag || null;
//     this.productType = data.ProductType || null;

//     this.fkBrandID = data.fkBrandID || 0;

//     this.imageName = data.ImageName || null;
//     this.imagePath = data.ImagePath || null;

//     this.brandName = data.BrandName || "";
//     this.brandCode = data.BrandCode || "";
//     this.brandLogo = data.BrandLogo || "";
//     this.brandLogoPath = data.BrandLogoPath || "";

//     this.mobileIcon = data.MobileIcon || "";
//     this.mobileIconPath = data.MobileIconPath || "";

//     this.categoryName = data.CategoryName || "";
//     this.packUnit = data.PackUnit || "";

//     this.fkProductSeriesID = data.fkProductSeriesID || 0;
//     this.productSeries = data.ProductSeries || "";

//     this.sku = data.SKU || "";
//     this.modelNo = data.ModelNo || "";

//     this.listPrice = data.ListPrice || 0;
//     this.discountPercent = data.DiscountPercent || 0;
//     this.sellingPrice = data.SellingPrice || 0;
//     this.discountPrice = data.DiscountPrice || 0;
//     this.gstPrice = data.GSTPrice || 0;
//     this.mainPrice = data.MainPrice || 0;

//     this.qty = data.Qty || 0;

//     this.minPrice = data.MinPrice || 0;
//     this.maxPrice = data.MaxPrice || 0;

//     this.availableQty = data.AvailableQty || 0;
//     this.minOrderQty = data.MinOrderQty || 1;

//     this.weight = data.Weight || 0;
//     this.weightUnit = data.WeightUnit || "";

//     this.height = data.Height || 0;
//     this.width = data.Width || 0;
//     this.length = data.Length || 0;

//     this.sizeUnitIn = data.SizeUnitIn || "";
//     this.sizeUnitOnWeb = data.SizeUnitOnWeb || "";

//     this.days = data.Days || 0;

//     this.h1Title = data.H1Title || "";
//     this.pageTitle = data.PageTitle || "";
//     this.pageKeyword = data.PageKeyword || "";
//     this.pageDescription = data.PageDescription || "";

//     this.shortDescr = data.ShortDescr || "";
//     this.longDescription = data.LongDescr || "";

//     this.fkGSTRateID = data.fkGSTRateID || 0;
//     this.gstRate = data.GSTRate || 0;

//     this.cartProduct = data.CartProduct || 0;
//     this.purchaseListID = data.PurchaseListID || 0;

//     this.videoName = data.VideoName || "";
//     this.youtubeVideo = data.YoutubeVideo || "";

//     this.deliveryCharge = data.DeliveryCharge || 0;
//     this.deliveryDays = data.DeliveryDays || 0;

//     this.hsnCode = data.HsnCode || "";

//     this.isSeries = data.IsSeries || false;
//     this.fk_Variation = data.fk_Variation || 0;
//   }
// }

class ProductImage {
  constructor(data = {}) {
    this.productImageID = data.ProductImageID ?? null;
    this.imageName = data.ImageName ?? "";
    this.displayOrder = data.DisplayOrder ?? 0;
    this.imagePath = data.ImagePath ?? "";
    this.imageZoomPath = data.ImageZoomPath ?? "";
  }
}

class ProductSpecification {
  constructor(data = {}) {
    this.attributeType = data.AttributeType ?? "";
    this.attributeValue = data.AttributeValue ?? "";
    this.displayOrder = data.DisplayOrder ?? 0;
    this.isKeyFeature = data.IsKeyFeature ?? false;
  }
}

class FilterMaster {
  constructor(data = {}) {
    this.filterValue = data.FilterValue ?? "";
    this.filterCode = data.FilterCode ?? "";
    this.filterCodeSlug = data.FilterCodeSlug ?? "";
    this.filterType = data.FilterType ?? "";
    this.sortOrder = data.sortorder ?? null;
    this.displayOrder = data.displayorder ?? null;
    this.filterImage = data.FilterImage ?? "";
    this.filterImagePath = data.FilterImagePath ?? "";
    this.typeUrl = data.TypeUrl ?? "";
  }
}

class BreadCrumb {
  constructor(data = {}) {
    this.categoryID = data.CategoryID ?? null;
    this.categoryCode = data.CategoryCode ?? "";
    this.categoryName = data.CategoryName ?? "";
    this.breadUrl = data.BreadUrl ?? "";
  }
}
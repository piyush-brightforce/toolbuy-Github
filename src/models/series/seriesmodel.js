export class ProductSeriesResponse {
  constructor(data = {}) {
    this.success = data.Success ?? false;
    this.message = data.Message ?? null;
    this.result = new ProductSeriesResult(data.Result ?? {});
  }
}

class ProductSeriesResult {
  constructor(data = {}) {
    this.productSeries = new ProductSeries(data.ProductSeries || {});

    this.productSeriesSpecificationList = (data.ProductSeriesSpecificationList || [])
      .map((item) => new ProductSeriesSpecification(item));

    this.breadcrumb = (data.BredCrumb || [])
      .map((item) => new BreadCrumb(item));

    this.seriesProducts = (data.SeriesProducts || [])
      .map((item) => new SeriesProduct(item));
  }
}

class ProductSeries {
  constructor(data = {}) {
    this.productSeriesID = data.ProductSeriesID ?? null;
    this.productCode = data.ProductCode ?? "";
    this.productCodeSlug = data.ProductCodeSlug ?? "";
    this.productTitle = data.ProductTitle ?? "";
    this.productSlag = data.ProductSlag ?? null;

    this.brandID = data.fkBrandID ?? null;
    this.brandName = data.BrandName ?? "";
    this.brandCode = data.BrandCode ?? "";
    this.brandLogo = data.BrandLogo ?? "";
    this.brandLogoPath = data.BrandLogoPath ?? "";

    this.categoryID = data.fkCategoryID ?? null;
    this.categoryName = data.CategoryName ?? "";

    this.listPrice = data.ListPrice ?? 0;
    this.discountPercent = data.DiscountPercent ?? 0;
    this.discountPrice = data.DiscountPrice ?? 0;
    this.finalPrice = data.FinalPrice ?? 0;
    this.sellingPrice = data.SellingPrice ?? 0;

    this.gstPrice = data.GSTPrice ?? 0;
    this.gstRate = data.GSTRate ?? 0;

    this.isActive = data.IsActive ?? false;

    this.shortDescription = data.ShortDescr ?? "";
    this.longDescription = data.LongDescr ?? "";

    this.imageName = data.ImageName ?? "";
    this.imagePath = data.ImagePath ?? "";

    this.minPrice = data.MinPrice ?? 0;
    this.maxPrice = data.MaxPrice ?? 0;

    this.h1Title = data.H1Title ?? "";
    this.pageTitle = data.PageTitle ?? "";
    this.pageKeyword = data.PageKeyword ?? "";
    this.pageDescription = data.PageDescription ?? "";

    this.mobileIcon = data.MobileIcon ?? "";
    this.mobileIconPath = data.MobileIconPath ?? "";

    this.filterValue = data.FilterValue ?? "";
  }
}

class ProductSeriesSpecification {
  constructor(data = {}) {
    this.seriesSpecificationID = data.SeriesSpecificationID ?? null;
    this.productSeriesID = data.fkProductSeriesID ?? null;

    this.attributeType = data.AttributeType ?? "";
    this.attributeValue = data.AttributeValue ?? "";

    this.displayOrder = data.DisplayOrder ?? 0;

    this.createdBy = data.CreatedBy ?? null;
    this.createdDate = data.CreatedDate ?? null;
    this.updatedBy = data.UpdatedBy ?? null;
    this.updatedDate = data.UpdatedDate ?? null;
  }
}

class BreadCrumb {
  constructor(data = {}) {
    this.categoryID = data.CategoryID ?? null;
    this.categoryCode = data.CategoryCode ?? "";
    this.categoryName = data.CategoryName ?? "";
    this.breadUrl = data.BreadUrl ?? null;
  }
}

class SeriesProduct {
  constructor(data = {}) {
    this.sku = data.SKU ?? "";
    this.modelNo = data.ModelNo ?? "";
    this.productID = data.ProductID ?? "";

    this.productCode = data.ProductCode ?? "";
    this.productCodeSlug = data.ProductCodeSlug ?? "";
    this.productTitle = data.ProductTitle ?? "";

    this.listPrice = Number(data.ListPrice ?? 0);
    this.finalPrice = Number(data.FinalPrice ?? 0);
    this.discountPercent = Number(data.DiscountPercent ?? 0);
    this.discountPrice = Number(data.DiscountPrice ?? 0);

    this.gstPrice = Number(data.GSTPrice ?? 0);
    this.mainPrice = Number(data.MainPrice ?? 0);
    this.gstRate = Number(data.GSTRate ?? 0);

    this.minOrderQty = Number(data.MinOrderQty ?? 0);
    this.minCartQty = Number(data.MinCartQty ?? 0);
    this.availableQty = Number(data.AvailableQty ?? 0);

    this.qty = Number(data.Qty ?? 0);
    this.variation = data.fk_Variation ?? "";

    this.boreDiameter = data["Bore Diameter"] ?? "";
    this.outsideDiameter = data["Outside Diameter"] ?? "";
    this.width = data["Width (mm)"] ?? "";

    this.priceHtml = data.Price ?? "";
    this.cartProduct = Number(data.CartProduct ?? 0);
  }
}
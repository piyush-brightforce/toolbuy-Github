export class CategoryProductResponse {
  constructor(json = {}) {
    this.success = json.Success || false;
    this.message = json.Message || '';
    this.result = json.Result ? new CategoryProductResult(json.Result) : null;
  }
}


export class CategoryProductResult {
  constructor(json = {}) {
    this.mainCategory = json.MainCategory
      ? new MainCategory(json.MainCategory)
      : null;

    this.listProduct = Array.isArray(json.ListProduct)
      ? json.ListProduct.map(item => new ListProduct(item))
      : [];

    this.productSummary = json.ProductSummary
      ? new ProductSummary(json.ProductSummary)
      : null;

    this.listFilter = Array.isArray(json.ListFilter)
      ? json.ListFilter.map(item => new ListFilter(item))
      : [];

    this.listFilterOrder = Array.isArray(json.ListFilterOrder)
      ? json.ListFilterOrder.map(item => new ListFilterOrder(item))
      : [];

     this.priceRange = json.PriceRange
      ? new PriceRange(json.PriceRange)
      : null;

    this.listProductType = Array.isArray(json.ListProductType)
      ? json.ListProductType.map(item => new ListProductType(item))
      : [];
  }
}

export class MainCategory {
  constructor(json = {}) {
    this.categoryID = json.CategoryID || 0;
    this.categoryCode = json.CategoryCode || '';
    this.categorySlug = json.CategorySlug || '';
    this.categoryName = json.CategoryName || '';
    this.parentID = json.ParentID || 0;
    this.pageTitle = json.PageTitle || '';
    this.pageKeyword = json.PageKeyword || null;
    this.pageDescription = json.PageDescription || null;
    this.shortDescr = json.ShortDescr || '';
    this.longDescr = json.LongDescr || '';
    this.parentCategoryName = json.ParentCategoryName || '';
    this.parentCategoryUrl = json.ParentCategoryUrl || '';
    this.productNote = json.ProductNote || null;
    this.h1Title = json.H1Title || null;
    this.brandName = json.BrandName || '';
    this.brandDescription = json.BrandDescription || '';
    this.brandLogo = json.BrandLogo || '';
    this.brandIcon = json.BrandIcon || '';
    this.imageName = json.ImageName || null;
    this.imagePath = json.ImagePath || null;
  }
}


export class PriceRange {
  constructor(json = {}) {
    this.totalRecord = json.TotalRecord || 0;
    this.pages = json.Pages || 0;
    this.minPrice = json.MinPrice || 0;
    this.maxPrice = json.MaxPrice || 0;
    this.allMinPrice = json.allMinPrice || 0;
    this.allMaxPrice = json.allMaxPrice || 0;
  }
}


export class ListProduct {
  constructor(json = {}) {
    this.rowNumber = json.RowNumber || 0;
    this.productID = json.ProductID || 0;
    this.productCode = json.ProductCode || '';
    this.productTitle = json.ProductTitle || '';
    this.productSlug = json.ProductSlug || '';
    this.listPrice = json.ListPrice || 0;
    this.discountPercent = json.DiscountPercent || 0;
    this.sellingPrice = json.SellingPrice || 0;
    this.qty = json.Qty || 0;
    this.availableQty = json.AvailableQty || 0;
    this.minOrderQty = json.MinOrderQty || 0;
    this.isSeries = json.IsSeries || false;
    this.brandName = json.BrandName || '';
    this.imageName = json.ImageName || '';
    this.imagePath = json.ImagePath || '';
    this.cartProduct = json.CartProduct || 0;
    this.purchaseListID = json.PurchaseListID || 0;
    this.minCartQty = json.MinCartQty || 0;
    this.minPrice = json.MinPrice || 0;
    this.maxPrice = json.MaxPrice || 0;
    this.fkVariation = json.fk_Variation || 0;
  }
}

export class ProductSummary {
  constructor(json = {}) {
    this.totalRecord = json.TotalRecord || 0;
    this.pages = json.Pages || 0;
    this.minPrice = json.MinPrice || 0;
    this.maxPrice = json.MaxPrice || 0;
    this.allMinPrice = json.allMinPrice || 0;
    this.allMaxPrice = json.allMaxPrice || 0;
  }
}

export class ListFilter {
  constructor(json = {}) {
    this.filterValue = json.FilterValue || '';
    this.filterCode = json.FilterCode || '';
    this.filterCodeSlug = json.FilterCodeSlug || '';
    this.filterType = json.FilterType || '';
    this.sortOrder = json.sortorder || 0;
    this.displayOrder = json.displayorder || 0;
    this.filterImage = json.FilterImage || '';
    this.filterImagePath = json.FilterImagePath || '';
    this.typeUrl = json.TypeUrl || '';
  }
}

export class ListFilterOrder {
  constructor(json = {}) {
    this.filterType = json.FilterType || '';
    this.displayOrder = json.DisplayOrder || 0;
    this.filterName = json.FilterName || '';
    this.urlOrder = json.URLOrder || 0;
    this.isExpand = json.IsExpand || false;
  }
}


export class ListProductType {
  constructor(json = {}) {
    this.filterValue = json.FilterValue || '';
    this.filterCode = json.FilterCode || '';
    this.filterCodeSlug = json.FilterCodeSlug || '';
    this.filterType = json.FilterType || '';
    this.sortOrder = json.sortorder || 0;
    this.displayOrder = json.displayorder || 0;
    this.filterImage = json.FilterImage || '';
    this.filterImagePath = json.FilterImagePath || '';
    this.typeUrl = json.TypeUrl || '';
  }
}

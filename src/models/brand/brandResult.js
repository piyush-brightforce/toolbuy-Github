// Product Type Model
export class ProductType {
  constructor(data = {}) {
    this.typeName = data.TypeName || null;
    this.typeCode = data.TypeCode || null;
    this.typeCodeSlug = data.TypeCodeSlug || null;
    this.imageName = data.ImageName || null;
    this.imagePath = data.ImagePath || null;
    this.fkCategoryID = data.fkCategoryID || null;
  }
}

// Sub Category Model
export class SubCategory {
  constructor(data = {}) {
    this.categoryID = data.CategoryID || null;
    this.categoryCode = data.CategoryCode || null;
    this.categoryCodeSlug = data.CategoryCodeSlug || null;
    this.categoryName = data.CategoryName || null;
    this.smallImage = data.SmallImage || null;
    this.productType = Array.isArray(data.ProductType)
      ? data.ProductType.map(item => new ProductType(item))
      : [];
  }
}

// Brand Store Category Model
export class BrandStoreCategory {
  constructor(data = {}) {
    this.categoryID = data.CategoryID || null;
    this.categoryCode = data.CategoryCode || null;
    this.categoryCodeSlug = data.CategoryCodeSlug || null;
    this.categoryName = data.CategoryName || null;
    this.smallImage = data.SmallImage || null;

    this.subcategories = data.subcategories || null;

    this.subcategorieslst = Array.isArray(data.subcategorieslst)
      ? data.subcategorieslst.map(item => new SubCategory(item))
      : [];
  }
}

// Brand Result Model
export class BrandResult {
  constructor(data = {}) {
    this.brandId = data.BrandId || null;
    this.brandCode = data.BrandCode || null;
    this.brandCodeSlug = data.BrandCodeSlug || null;
    this.brandName = data.BrandName || null;
    this.brandDescription = data.BrandDescription || null;
    this.h1Title = data.H1Title || null;
    this.pageTitle = data.PageTitle || null;
    this.pageKeyword = data.PageKeyword || null;
    this.logo = data.Logo || null;
    this.description = data.description || null;
    this.bigLogo = data.BigLogo || null;

    this.brandStoreCategories = Array.isArray(data.brandStoreCategories)
      ? data.brandStoreCategories.map(item => new BrandStoreCategory(item))
      : [];

    this.brandStoreBanners = Array.isArray(data.brandStoreBanners)
      ? data.brandStoreBanners
      : [];
  }
}

// Main API Response Model
export class BrandResponse {
  constructor(data = {}) {
    this.success = data.Success || false;
    this.message = data.Message || null;
    this.result = data.Result ? new BrandResult(data.Result) : null;
  }
}

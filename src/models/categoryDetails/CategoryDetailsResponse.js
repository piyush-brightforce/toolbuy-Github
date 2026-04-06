export class CategoryDetailsResponse {
  constructor(data = {}) {
    this.success = data.Success ?? false;
    this.message = data.Message ?? null;
    this.result = new CategoryResult(data.Result);
  }
}
export class CategoryResult {
  constructor(data = {}) {
    this.subCategoryList = (data.SubCategoryList || []).map(
      (item) => new SubCategory(item)
    );

    this.brandList = (data.BrandList || []).map((group) =>
      (group || []).map((item) => new Brand(item))
    );

    this.bannerList = (data.BannerList || []).map(
      (item) => new Banner(item)
    );

    this.category = data.Category
      ? new Category(data.Category)
      : null;
  }
}
export class SubCategory {
  constructor(data = {}) {
    this.categoryID = data.CategoryID ?? null;
    this.categoryName = data.CategoryName ?? "";
    this.categorySlug = data.CategorySlug ?? "";
    this.categoryCode = data.CategoryCode ?? "";
    this.imageName = data.ImageName ?? "";
    this.imagePath = data.ImagePath ?? "";
    this.mobileIcon = data.MobileIcon ?? null;
    this.mobileIconPath = data.MobileIconPath ?? null;
    this.smallImage = data.SmallImage ?? null;

    this.productType = (data.ProductType || []).map(
      (item) => new ProductType(item)
    );

    this.productTypeLists = data.ProductTypeLists ?? null;
  }
}
export class ProductType {
  constructor(data = {}) {
    this.typeName = data.TypeName ?? "";
    this.typeCode = data.TypeCode ?? "";
    this.typeCodeSlug = data.TypeCodeSlug ?? "";
    this.imageName = data.ImageName ?? "";
    this.imagePath = data.ImagePath ?? "";
    this.fkCategoryID = data.fkCategoryID ?? 0;
  }
}
export class Brand {
  constructor(data = {}) {
    this.brandCode = data.BrandCode ?? "";
    this.brandName = data.BrandName ?? "";
    this.brandCategoryImage = data.BrandCategoryImage ?? "";
    this.logoPath = data.LogoPath ?? "";
    this.mobileIconPath = data.MobileIconPath ?? "";
    this.brandCategoryImagePath = data.BrandCategoryImagePath ?? "";
    this.brandCategoryCode = data.BrandCategoryCode ?? "";
    this.logoImagePath = data.LogoImagePath ?? "";
  }
}
export class Banner {
  constructor(data = {}) {
    this.categoryName = data.CategoryName ?? null;
    this.title = data.Title ?? "";
    this.shortDescr = data.ShortDescr ?? "";
    this.bannerURL = data.BannerURL ?? "";
    this.imageName = data.ImageName ?? "";
    this.imagePath = data.ImagePath ?? "";
  }
}
export class Category {
  constructor(data = {}) {
    this.categoryID = data.CategoryID ?? null;
    this.categoryCode = data.CategoryCode ?? "";
    this.categoryName = data.CategoryName ?? "";
    this.breadUrl = data.BreadUrl ?? null;
    this.h1Title = data.H1Title ?? "";
    this.pageTitle = data.PageTitle ?? "";
    this.pageKeyword = data.PageKeyword ?? "";
    this.pageDescription = data.PageDescription ?? "";
    this.shortDescr = data.ShortDescr ?? "";
    this.imageName = data.ImageName ?? "";
    this.imageNamePath = data.ImageNamePath ?? "";
    this.mobileIcon = data.MobileIcon ?? "";
    this.mobileIconPath = data.MobileIconPath ?? "";
  }
}
export class CategoryItem {
  constructor(data = {}) {
    this.CategoryID = data.CategoryID || 0;
    this.CategoryCode = data.CategoryCode || '';
    this.CategoryName = data.CategoryName || '';
    this.ImageName = data.ImageName || null;
    this.ImagePath = data.ImagePath || '';
    this.MobileIcon = data.MobileIcon || null;
    this.MobileIconPath = data.MobileIconPath || '';
    this.SmallImage = data.SmallImage || null;
    this.ProductCount = data.ProductCount || 0;
    this.ParentID = data.ParentID || 0;
    this.ParentCategoryCode = data.ParentCategoryCode || '';
  }
}

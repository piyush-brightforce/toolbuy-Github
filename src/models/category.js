export default class Category {
  constructor(data) {
    this.id = data.BrandId;
    this.name = data.CategoryName;
    this.code = data.CategoryCode;
    this.image = data.SmallImage;
  }
}
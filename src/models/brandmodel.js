export default class Brand {
  constructor(data) {
    this.id = data.BrandId;
    this.name = data.BrandName;
    this.code = data.BrandCode;
    this.logo = data.LogoImagePath;
    this.description = data.BrandDescription;
    this.categories = data.categories || [];
  }
}
 

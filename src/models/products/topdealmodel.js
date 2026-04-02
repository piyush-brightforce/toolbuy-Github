import Product from './products';
import ProductImage from './productimage';

export default class TopDealResponse {
  constructor(apiResponse) {
    const result = apiResponse?.Result || {};

    this.product = result.ProductMasterTopOfDealsMonth
      ? new Product(result.ProductMasterTopOfDealsMonth)
      : null;

    this.images = Array.isArray(result.ProductImageList)
      ? result.ProductImageList.map(img => new ProductImage(img))
      : [];
  }
}


export default class ProductImage {
  constructor(data) {
    this.id = data?.ProductImageID || null;
    this.name = data?.ImageName || '';
    this.displayOrder = data?.DisplayOrder || 0;
    this.imagePath = data?.ImagePath || '';
    this.zoomPath = data?.ImageZoomPath || '';
  }

  get fullImageUrl() {
    return `${this.imagePath}`;
  }

  get fullZoomUrl() {
    return `${this.zoomPath}`;
  }
}

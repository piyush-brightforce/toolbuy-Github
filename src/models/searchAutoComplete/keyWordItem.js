export class KeywordItem {
  constructor(data = {}) {
    this.SearchFilter = data.SearchFilter || '';
    this.SearchCode = data.SearchCode || '';
    this.URL = data.URL || '';
  }
}

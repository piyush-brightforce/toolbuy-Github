 
import { CategoryItem } from './categoryItem';
import { KeywordItem } from './keyWordItem';


export default class SearhcResultResponse {
  constructor(apiResponse) {
    const result = apiResponse?.Result || {};

    this.KeywordList = Array.isArray(result.KeywordList)
      ? result.KeywordList.map(item => new KeywordItem(item))
      : [];
    this.CategoryMasterList = Array.isArray(result.CategoryMasterList)
      ? result.CategoryMasterList.map(item => new CategoryItem(item))
      : [];
  }
}

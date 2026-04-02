export default class SignupResponseModel {
  constructor(data) {
    this.CustomerID = data?.CustomerID || 0;
    this.Account_Type = data?.Account_Type || 0;
    this.BusinessName = data?.BusinessName || '';
    this.FullName = data?.FullName || '';
    this.email = data?.email || '';
    this.Token = data?.Token || '';
    this.TotalCartItem = data?.TotalCartItem || 0
  }
}

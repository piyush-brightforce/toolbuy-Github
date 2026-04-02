
export class AddressResponse {
  constructor(data = {}) {
    this.success = data.Success ?? false;
    this.message = data.Message ?? "";

    this.result = (data.Result || []).map(
      (item) => new AddressItem(item)
    );
  }
}

export class AddressItem {
  constructor(data = {}) {
    this.addressID = data.AddressID ?? null;
    this.businessName = data.BusinessName ?? "";
    this.fullName = data.FullName ?? null;
    this.firstName = data.FirstName ?? "";
    this.address1 = data.Address1 ?? "";
    this.address2 = data.Address2 ?? "";
    this.city = data.City ?? "";
    this.zipcode = data.zipcode ?? "";
    this.mobile = data.Mobile ?? "";
    this.email = data.email ?? null;
    this.isPrimary = data.IsPrimary ?? false;
    this.customerID = data.CustomerID ?? null;
    this.state = data.State ?? "";
    this.accountType = data.accounttype ?? 0;
    this.gstin = data.GSTIN ?? "";
    this.isShipping = data.IsShipping ?? false;
    this.isBuyingCompany = data.IsBuyingCompany ?? false;
    this.isDelivery = data.IsDelivery ?? false;
    this.landmark = data.Landmark ?? null;
  }
}
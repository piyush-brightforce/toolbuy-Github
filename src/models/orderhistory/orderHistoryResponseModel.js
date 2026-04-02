export class OrderHistoryListResponse {
  constructor(data = {}) {
    this.success = data?.Success ?? false;
    this.message = data?.Message ?? null;

    this.result = (data?.Result || []).map(
      item => new OrderHistoryListItem(item)
    );
  }
}

export class OrderHistoryListItem {
  constructor(data = {}) {
    this.OrderId = data?.OrderId ?? 0;
    this.OrderNumber = data?.OrderNumber ?? "";

    this.PaymentStatus = data?.PaymentStatus ?? 0;
    this.PaymentStatusName = data?.PaymentStatusName ?? null;

    this.Status = data?.Status ?? "";

    this.OrderDate = data?.OrderDate ?? "";
    this.ExpectShipDate = data?.ExpectShipDate ?? "";

    this.InvoiceIDs = data?.InvoiceIDs ?? "";

    this.PaymentMethodName = data?.PaymentMethodName ?? "";

    this.TotalQty = data?.TotalQty ?? 0;
    this.TotalPrice = data?.TotalPrice ?? 0;
    this.TotalShippment = data?.TotalShippment ?? null;

    this.DiscountPrice = data?.DiscountPrice ?? null;
    this.CreditAmt = data?.CreditAmt ?? null;

    this.NetPrice = data?.NetPrice ?? 0;

    // Shipping Info
    this.SFirstName = data?.SFirstName ?? "";
    this.SStreet1 = data?.SStreet1 ?? "";

    this.SCity = data?.SCity?.trim() ?? "";
    this.SState = data?.SState ?? null;
    this.SZipCode = data?.SZipCode ?? "";

    this.SMobile = data?.SMobile ?? "";
    this.SEmail = data?.SEmail ?? "";

    // Tracking
    this.trackingurl = data?.trackingurl ?? "";
    this.ShipCompany = data?.ShipCompany ?? null;
  }
}
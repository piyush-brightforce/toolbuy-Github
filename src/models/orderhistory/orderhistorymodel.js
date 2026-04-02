export class OrderResponse {
  constructor(data = {}) {
    this.success = data.Success ?? false;
    this.message = data.Message ?? null;
    this.result = new OrderResult(data.Result);
  }
}

export class OrderResult {
  constructor(data = {}) {
    this.orderDetails = (data.GetOrderDetail || []).map(
      item => new OrderDetail(item)
    );

    this.orderMaster = new OrderMaster(data.OrderMaster);

    this.shippingAddressDetail = data.ShippingAddressDetail ?? null;
    this.orderPayment = data.OrderPayment ?? null;
    this.productVariationList = data.ProductVariationLsit || [];
    this.orderDetailsExtra = data.OrderDetails ?? null;
    this.orderMaster2 = data.OrderMaster2 ?? null;
  }
}

export class OrderDetail {
  constructor(data = {}) {
    this.OrderDetailID = data?.OrderDetailID ?? 0;
    this.fkOrderID = data?.fkOrderID ?? null;
    this.fkProductID = data?.fkProductID ?? 0;

    this.ProdBrandModel = data?.ProdBrandModel ?? "";
    this.SeriesCode = data?.SeriesCode ?? null;

    this.ProductCode = data?.ProductCode ?? "";
    this.ProductCodeSlug = data?.ProductCodeSlug ?? "";

    this.fkSupplierID = data?.fkSupplierID ?? null;

    this.Qty = data?.Qty ?? 0;
    this.OurPrice = data?.OurPrice ?? 0;
    this.SellingPrice = data?.SellingPrice ?? 0;

    this.Height = data?.Height ?? 0;
    this.Width = data?.Width ?? 0;
    this.Length = data?.Length ?? 0;
    this.Weight = data?.Weight ?? 0;
    this.WeightUnit = data?.WeightUnit ?? "";

    this.PendingatToolbuy = data?.PendingatToolbuy ?? null;
    this.PendingatSupplier = data?.PendingatSupplier ?? null;
    this.isReceived = data?.isReceived ?? null;
    this.ReceivedOn = data?.ReceivedOn ?? null;

    this.fkPaymentStatusID = data?.fkPaymentStatusID ?? null;

    this.ProductDiscount = data?.ProductDiscount ?? 0;
    this.SuppDispatchDate = data?.SuppDispatchDate ?? null;
    this.IsReturn = data?.IsReturn ?? null;

    this.SupplierPayment = data?.SupplierPayment ?? null;
    this.IsSuppDispatch = data?.IsSuppDispatch ?? null;
    this.ReceivedQty = data?.ReceivedQty ?? null;

    this.rackno = data?.rackno ?? null;
    this.SupplierPrice = data?.SupplierPrice ?? null;
    this.SupplierPaymentDate = data?.SupplierPaymentDate ?? null;

    this.CashBack = data?.CashBack ?? 0;

    this.CheckedBy = data?.CheckedBy ?? null;
    this.GRDate = data?.GRDate ?? null;

    this.PCouponCode = data?.PCouponCode ?? null;
    this.IsShipFree = data?.IsShipFree ?? null;

    this.ProductImage = data?.ProductImage ?? "";
    this.ProductImagePath = data?.ProductImagePath ?? "";

    this.ProductTitle = data?.ProductTitle ?? "";
    this.CouponDiscount = data?.CouponDiscount ?? 0;
    this.ProductSeriesTitle = data?.ProductSeriesTitle ?? "";

    this.DiscountPercent = data?.DiscountPercent ?? 0;
    this.color = data?.color ?? null;

    this.SKU = data?.SKU ?? "";

    this.fkGSTRateID = data?.fkGSTRateID ?? 0;
    this.GSTRate = data?.GSTRate ?? 0;

    this.DispGSTPer = data?.DispGSTPer ?? "";

    this.SGST = data?.SGST ?? 0;
    this.SGSTAmount = data?.SGSTAmount ?? 0;

    this.CGST = data?.CGST ?? 0;
    this.CGSTAmount = data?.CGSTAmount ?? 0;

    this.TotalAmount = data?.TotalAmount ?? 0;

    this.HSNCode = data?.HSNCode ?? null;

    this.fkVariationID = data?.fkVariationID ?? 0;
    this.PackUnit = data?.PackUnit ?? "";

    this.Variation = data?.Variation ?? null;

    this.IsCancel = data?.IsCancel ?? false;

    this.IGSTAmount = data?.IGSTAmount ?? 0;
    this.TotalSellingPriceQtyWise = data?.TotalSellingPriceQtyWise ?? 0;
    this.IGST = data?.IGST ?? 0;
  }
}

export class OrderMaster {
  constructor(data = {}) {
    this.OrderId = data?.OrderId ?? 0;
    this.encOrderID = data?.encOrderID ?? null;
    this.OrderNumber = data?.OrderNumber ?? '';

    this.TotalQty = data?.TotalQty ?? 0;
    this.TotalPrice = data?.TotalPrice ?? 0;
    this.TotalShippment = data?.TotalShippment ?? 0;
    this.DiscountPrice = data?.DiscountPrice ?? 0;
    this.CreditAmt = data?.CreditAmt ?? null;

    this.NetPrice = data?.NetPrice ?? 0;

    this.SBusinessName = data?.SBusinessName ?? "";
    this.SFirstName = data?.SFirstName ?? "";
    this.SLastName = data?.SLastName ?? "";

    this.SStreet1 = data?.SStreet1 ?? "";
    this.SStreet2 = data?.SStreet2 ?? "";

    this.SCity = data?.SCity ?? "";
    this.SState = data?.SState ?? "";
    this.SCountryCode = data?.SCountryCode ?? "";
    this.CountryName = data?.CountryName ?? "";

    this.SZipCode = data?.SZipCode ?? "";
    this.SMobile = data?.SMobile ?? "";
    this.SPhoneNo = data?.SPhoneNo ?? "";
    this.SLandmark = data?.SLandmark ?? "";

    this.BFirstName = data?.BFirstName ?? "";
    this.BLastName = data?.BLastName ?? "";

    this.BStreet1 = data?.BStreet1 ?? "";
    this.BStreet2 = data?.BStreet2 ?? "";

    this.BCity = data?.BCity ?? "";
    this.BState = data?.BState ?? "";
    this.BCountryCode = data?.BCountryCode ?? "";
    this.BCountryName = data?.BCountryName ?? "";

    this.BZipCode = data?.BZipCode ?? "";
    this.BMobile = data?.BMobile ?? "";
    this.BPhoneNo = data?.BPhoneNo ?? "";
    this.BLandmark = data?.BLandmark ?? "";

    this.SEmail = data?.SEmail ?? "";
    this.encSEmail = data?.encSEmail ?? null;

    this.GSTRate = data?.GSTRate ?? 0;

    this.IsReturn = data?.IsReturn ?? null;
    this.fkOrderStatusID = data?.fkOrderStatusID ?? null;
    this.fkPaymentStatusID = data?.fkPaymentStatusID ?? null;
    this.fkCustomerID = data?.fkCustomerID ?? null;

    this.CouponCode = data?.CouponCode ?? "";
    this.CurrencySymbol = data?.CurrencySymbol ?? "";

    this.OrderDate = data?.OrderDate ?? "";
    this.ExpectShipDate = data?.ExpectShipDate ?? "";

    this.EmailCount = data?.EmailCount ?? null;
    this.MobileOrderFlag = data?.MobileOrderFlag ?? null;
    this.FraudAlert = data?.FraudAlert ?? null;

    this.fkPaymentMethodId = data?.fkPaymentMethodId ?? null;
    this.fkPaymentOrderID = data?.fkPaymentOrderID ?? null;
    this.encfkPaymentOrderID = data?.encfkPaymentOrderID ?? null;

    this.CashBack = data?.CashBack ?? 0;

    this.IsUrgent = data?.IsUrgent ?? null;
    this.IsWholesaler = data?.IsWholesaler ?? null;

    this.PaymentVerify = data?.PaymentVerify ?? null;
    this.PaymentVerifyBy = data?.PaymentVerifyBy ?? null;

    this.IsThanksVisited = data?.IsThanksVisited ?? false;

    this.DiscountType = data?.DiscountType ?? null;
    this.IsShipFree = data?.IsShipFree ?? false;

    this.OfferCouponCode = data?.OfferCouponCode ?? null;
    this.OfferDiscountType = data?.OfferDiscountType ?? null;

    this.fkCustomerAddressID = data?.fkCustomerAddressID ?? 0;
    this.BillingCustAddressId = data?.BillingCustAddressId ?? 0;

    this.Status = data?.Status ?? "";
    this.PaymentMethodName = data?.PaymentMethodName ?? "";

    this.PaymentStatus = data?.PaymentStatus ?? 0;
    this.PaymentStatusName = data?.PaymentStatusName ?? "";

    this.TransactionId = data?.TransactionId ?? null;

    this.gstin = data?.GSTIN ?? "";
    this.BGSTIN = data?.BGSTIN ?? "";
    this.InvoiceIDs = data?.InvoiceIDs ?? '';

    this.AmountWord = data?.AmountWord ?? null;

    this.CODCharge = data?.CODCharge ?? 0;

    this.WayBill = data?.WayBill ?? null;
    this.Token = data?.Token ?? null;

    this.trackingurl = data?.trackingurl ?? null;
    this.logo = data?.logo ?? null;
    this.ShipCompany = data?.ShipCompany ?? null;

    this.TotalAmount = data?.TotalAmount ?? 0;
    this.ShippingRemove = data?.ShippingRemove ?? 0;

    this.ActualAmt = data?.ActualAmt ?? null;

    this.TotalGSTAmount = data?.TotalGSTAmount ?? 0;
    this.RoundOff = data?.RoundOff ?? 0;

    this.TotalOrder = data?.TotalOrder ?? 0;
    this.TotalItems = data?.TotalItems ?? 0;

    this.InvoiceUrl = data?.InvoiceUrl ?? "";
    this.InvoiceNo = data?.InvoiceNo ?? 0;
    this.invoiceids = data?.invoiceids ?? "";

    this.TIN = data?.TIN ?? null;
    this.InvoiceDate = data?.InvoiceDate ?? null;

    this.TotalShippmentSGST = data?.TotalShippmentSGST ?? 0;
    this.TotalShippmentIGSTRate = data?.TotalShippmentIGSTRate ?? 0;
    this.TotalShippmentCGST = data?.TotalShippmentCGST ?? 0;
    this.TotalShippmentIGST = data?.TotalShippmentIGST ?? 0;

    this.CODChargeIGSTRate = data?.CODChargeIGSTRate ?? 0;
    this.CODChargeSGST = data?.CODChargeSGST ?? 0;
    this.CODChargeCGST = data?.CODChargeCGST ?? 0;
    this.CODChargeIGST = data?.CODChargeIGST ?? 0;

    this.BBusinessName =  data?.BBusinessName ?? '';

 
  }
}
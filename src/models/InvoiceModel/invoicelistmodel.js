
export class InvoiceResponse {
  constructor(data = {}) {
    this.success = data.Success ?? false;
    this.message = data.Message ?? "";

    this.result = (data.Result || []).map(
      (item) => new InvoiceItem(item)
    );
  }
}

export class InvoiceItem {
  constructor(data = {}) {
    this.InvoiceId = data.InvoiceId ?? 0;
    this.IssueDate = data.IssueDate ?? "";
    this.OrderNumber = data.OrderNumber ?? '';
    this.OrderId = data.OrderId ?? 0;
    this.OrderDate = data.OrderDate ?? ''; 
    this.NetPrice = data.NetPrice ?? 0; 
  }
}
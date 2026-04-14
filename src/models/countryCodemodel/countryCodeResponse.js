export class PincodeResponse {
  constructor(json = {}) {
    this.message = json.Message || '';
    this.status = json.Status || '';

    this.postOffices = Array.isArray(json.PostOffice)
      ? json.PostOffice.map(item => new PostOffice(item))
      : [];
  }
}

export class PostOffice {
  constructor(json = {}) {
    this.name = json.Name || '';
    this.description = json.Description || null;
    this.branchType = json.BranchType || '';
    this.deliveryStatus = json.DeliveryStatus || '';
    this.circle = json.Circle || '';
    this.district = json.District || '';
    this.division = json.Division || '';
    this.region = json.Region || '';
    this.block = json.Block || '';
    this.state = json.State || '';
    this.country = json.Country || '';
    this.pincode = json.Pincode || '';
  }
}
export class PincodeApiResponse {
  constructor(json = []) {
    this.data = Array.isArray(json)
      ? json.map(item => new PincodeResponse(item))
      : [];
  }
}
export interface IPO {
  billNo: number;
  order_id: number;
  item_id: number;
  reqName: string;
  urg_msg: string;
  attachments: string;
  reason: string;
  comment: string;
  behalf: string;
  purchase_type: string;
  message: string;
  currency: string;
  org_billed: string;
  cmp_name: string;
  location: string;
  bill_to_address: string;
  delivery_to: string;
  required_by: string;
  delivery_address: string;
  cost_center: string;
  project_code: string;
  budget_code: string;
  item_name: string;
  quantity: number;
  price: number;
  total: number;
  status?: string;
}

export class PO {
  billNo: number;
  order_id: number;
  item_id: number;
  reqName: string;
  urg_msg: string;
  attachments: string;
  reason: string;
  comment: string;
  behalf: string;
  purchase_type: string;
  message: string;
  currency: string;
  org_billed: string;
  cmp_name: string;
  location: string;
  bill_to_address: string;
  delivery_to: string;
  required_by: string;
  delivery_address: string;
  cost_center: string;
  project_code: string;
  budget_code: string;
  item_name: string;
  quantity: number;
  price: number;
  total: number;
  status: string;

  constructor(  billNo: number,
    order_id: number,
    item_id: number,
    reqName: string,
    urg_msg: string,
    attachments: string,
    reason: string,
    comment: string,
    behalf: string,
    purchase_type: string,
    message: string,
    currency: string,
    org_billed: string,
    cmp_name: string,
    location: string,
    bill_to_address: string,
    delivery_to: string,
    required_by: string,
    delivery_address: string,
    cost_center: string,
    project_code: string,
    budget_code: string,
    item_name: string,
    quantity: number,
    price: number,
    total: number,
    status: string){
      this.billNo = billNo;
      this.order_id = order_id;
      this.item_id = item_id;
      this.reqName = reqName;
      this.urg_msg = urg_msg;
      this.attachments = attachments;
      this.reason = reason;
      this.comment = comment;
      this.behalf = behalf;
      this.purchase_type = purchase_type;
      this.message = message;
      this.currency = currency;
      this.org_billed = org_billed;
      this.cmp_name = cmp_name;
      this.location = location;
      this.bill_to_address = bill_to_address;
      this.delivery_to = delivery_to;
      this.required_by = required_by;
      this.delivery_address = delivery_address;
      this.cost_center = cost_center;
      this.project_code = project_code;
      this.budget_code = budget_code;
      this.item_name = item_name;
      this.quantity = quantity;
      this.quantity = price;
      this.total = total;
      this.status = status;
}

}

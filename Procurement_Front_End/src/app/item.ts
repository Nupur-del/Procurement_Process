export interface IItem {
  id: number;
  order_id: number;
  name: string;
  specification: string;
  prefered_vendor: string;
  quantity: number;
  unit_type: string;
  price: number;
  currency: string;
  custom: string;
  comment: string;
}

export class Item {
  id: number;
  order_id: number;
  name: string;
  specification: string;
  prefered_vendor: string;
  quantity: number;
  unit_type: string;
  price: number;
  currency: string;
  custom: string;
  comment: string;

  constructor(id ?: number, order_id ?: number, name?: string,
    specification?: string,
    prefered_vendor?: string,
    quantity?: number,
    unit_type?: string,
    price?: number,
    currency?: string,
    custom?: string,
    comment?: string){
    this.id = id;
    this.order_id = order_id;
    this.name = name;
    this.specification =  specification;
    this.prefered_vendor = prefered_vendor;
    this.quantity = quantity;
    this.unit_type = unit_type;
    this.price = price;
    this.currency = currency;
    this.custom = custom;
    this.comment = comment;
}

}

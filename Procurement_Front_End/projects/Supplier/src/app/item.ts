export interface IItem {
  item_id: string;
  name: string;
  sku: string;
  brand: string;
  price: number;
  currency: string;
  features: number;
  desc: string;
  discount: string;
  quantity: number;
  threshold: number;
  warranty: string;
  policy: string;
  location: string;
}

export class Item {
  item_id: string;
  name: string;
  sku: string;
  brand: string;
  price: number;
  currency: string;
  features: number;
  desc: string;
  discount: string;
  quantity: number;
  threshold: number;
  warranty: string;
  policy: string;
  location: string;

  constructor(  item_id: string,
    name: string,
    sku: string,
    brand: string,
    price: number,
    currency: string,
    features: number,
    desc: string,
    discount: string,
    quantity: number,
    threshold: number,
    warranty: string,
    policy: string,
    location: string){
  this.item_id = item_id;
  this.name = name;
  this.sku = sku;
  this.brand =  brand;
  this.price = price;
  this.currency = currency;
  this.features = features;
  this.desc = desc;
  this.discount = discount;
  this.quantity = quantity;
  this.threshold = threshold;
  this.warranty = warranty;
  this.policy = policy;
  this.location = location;
}

}

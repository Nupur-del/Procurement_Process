export interface IOrder {
  order_id: number;
  created_by: string;
  date: string;
  order_desc: string;
  status: string;
  message: string;
}

export class Order {

  order_id: number;
  created_by: string;
  date: string;
  order_desc: string;
  status: string;
  message: string;

  constructor(order_id?: number, created_by?: string, date?: string, order_desc?: string, status ?: string, message ?: string){
    this.order_id = order_id;
    this.created_by = created_by;
    this.date = date;
    this.order_desc = order_desc;
    this.status =  status;
    this.message = message;
}

}

export interface IStatus {
  order_id: number;
  status: string;
  message: string;
}

export class Status {
  order_id: number;
  status: string;
  message: string;

  constructor(order_id ?: number, status ?: string, message?: string){
    this.order_id = order_id;
    this.status = status;
    this.message = message;
}

}

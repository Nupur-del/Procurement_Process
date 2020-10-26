import { Injectable } from '@angular/core';
import { Order, IOrder } from '../app/order';
import { Status, IStatus } from '../app/status';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface OrdData {
  order_id: number;
  order_desc: string;
  created_by: string;
  name: string;
  specification: string;
  prefered_vendor: string;
  quantity: number;
  unit_type: string;
  price: number;
  currency: string;
  custom?: string;
  comment?: string;
  status?: string;
  estimated_arrival?: Date;
  tracking_link?: string;
  location: string;
  department: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {

order: any = [];
today = new Date();
dd = String(this.today.getDate()).padStart(2, '0');
mm = String(this.today.getMonth() + 1).padStart(2, '0');
yyyy = this.today.getFullYear();
d1 = this.mm + '/' + this.dd + '/' + this.yyyy;
private orders: Array<Order> = [
// tslint:disable-next-line: max-line-length
{ order_id: 1232, created_by: 'Harshit Singh', date: this.d1,
  order_desc: 'Sample Order 1', status: 'pending' , message: 'Request submitted for review'},
// tslint:disable-next-line: max-line-length
{ order_id: 3232, created_by: 'Alec', date: this.d1,
  order_desc: 'Sample Order 3', status: 'pending' , message: 'Request submitted for review'},
// tslint:disable-next-line: max-line-length
{ order_id: 4545, created_by: 'Alexender', date: this.d1,
  order_desc: 'Sample Order 2', status: 'pending' , message: 'Request submitted for review'}
];

constructor(private http: HttpClient) { }

  // tslint:disable-next-line: variable-name
getOrderById(order_id: any): Observable<IOrder> {

  // tslint:disable-next-line: prefer-const
  let Orderparams = new HttpParams().set('order_id', order_id);
  return this.http.get<IOrder>(environment.BASE_URL + 'order/Order_by_order_id', { params: Orderparams });
}

  // tslint:disable-next-line: variable-name
getStatusById(order_id: any): Observable<IStatus> {
  let orderParams = new HttpParams().set('order_id', order_id);
  return this.http.get<IStatus>(environment.BASE_URL + 'order/Status_by_order_id', { params: orderParams });
}

getOrderByStatus(status: string): Observable<IOrder[]> {
  let statusParams = new HttpParams().set('status', status);
  return this.http.get<IOrder[]>(environment.BASE_URL + 'orders/Order_by_status', { params: statusParams });
}

getAllOrders(): Observable<IOrder[]> {
  return this.http.get<IOrder[]>(environment.BASE_URL + 'orders/allOrders');
  }

replicateOrder(order: any): void {
  order.order_id = Math.floor(Math.random() * 10000) + 1;
  order.message = 'Pending for approval';
  order.status = 'Pending';
  console.log(order);
  this.http.post(environment.BASE_URL + 'order/order', order).subscribe(data => {
  console.log(data);
  }, err => {
  console.log(err);
  });
}

// addOrder(order: any): Observable<string> {
//   order.action = 'insert';
//   console.log(order);
//   return this.http.post<string>('http://localhost/My Project/ionic2php/order.php', order);
// }

deleteOrder(val: any): void {
  var indexes = [];
  for (var i = 0; i < this.orders.length; i++) {
      if (this.orders[i].order_id === val) {
          indexes.push(i);
      }
  }
  for (var i = 0; i < indexes.length; i++) {
    indexes[i] = indexes[i] - i;
    this.orders.splice(indexes[i], 1);
  }
  console.log('Order Service Data-', this.getAllOrders());
}

updateOrder(order: IOrder): void {
  const index = this.orders.findIndex(item => item.order_id === order.order_id);
  this.orders[index] = order;
}

editOrder(order: any): Observable<any> {
  order.message = 'Pending for approval';
  order.status = 'Pending';
  console.log('Edit Order', order);
  return this.http.post<any>(environment.BASE_URL + 'order/order', order);
}

getAllOrderCount(): Observable<number> {
  return this.http.get<number>(environment.BASE_URL + 'order/countOrder');
}

getStatusOrderCount(status: any): Observable<number>  {
  let statusParams = new HttpParams().set('status', status);
  return this.http.get<number>(environment.BASE_URL + 'orders/countStatusOrder', { params: statusParams });
}

}

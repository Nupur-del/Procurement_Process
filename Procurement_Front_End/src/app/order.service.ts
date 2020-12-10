import { Injectable } from '@angular/core';
import { Order, IOrder } from '../app/order';
import { Status, IStatus } from '../app/status';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
orderList: Array<IOrder> = [];
d1 = this.mm + '/' + this.dd + '/' + this.yyyy;
private orders: Array<Order> = [];

constructor(private http: HttpClient,
            private router: Router) { }

  // tslint:disable-next-line: variable-name
getOrderById(order_id: any): Observable<IOrder> {

  // tslint:disable-next-line: prefer-const
  let Orderparams = new HttpParams().set('order_id', order_id);
  return this.http.get<IOrder>(environment.BASE_URL + 'order/Order_by_order_id', { params: Orderparams });
}

updateColor(order: any): Observable<any> {
  return this.http.post(environment.BASE_URL + 'orders/updateColor' , order);
}

  // tslint:disable-next-line: variable-name
getStatusById(order_id: any): Observable<IStatus> {
  let orderParams = new HttpParams().set('order_id', order_id);
  return this.http.get<IStatus>(environment.BASE_URL + 'order/Status_by_order_id', { params: orderParams });
}

getOrderByStatus(status: string, userID: any, userType: string): Observable<IOrder[]> {
  let statusParams = new HttpParams().set('status', status).set('userID', userID);
  if (userType === 'Requestor') {
    return this.http.get<IOrder[]>(environment.BASE_URL + 'orders/Order_by_status', { params: statusParams });
  } else {
    return this.http.get<IOrder[]>(environment.BASE_URL + 'orders/Order_by_statusApprover', { params: statusParams });
  }
}

getAllOrders(userID: any, userType: string): Observable<IOrder[]> {
  let userParams = new HttpParams().set('userID', userID);
  if (userType === 'Requestor') {
      return this.http.get<IOrder[]>(environment.BASE_URL + 'orders/allOrders', {params: userParams});
  } else {
    return this.http.get<IOrder[]>(environment.BASE_URL + 'orders/allOrdersApprover', {params: userParams});
  }
}

replicateOrder(order: any, path?: string): void {
  order.order_id = Math.floor(Math.random() * 10000) + 1;
  order.message = 'Pending for approval';
  console.log('Replicated Order', order);
  this.http.post(environment.BASE_URL + 'order/order', order).subscribe(data => {
  console.log(data);
  if (path === 'Approved' || path === 'Denied') {
    this.router.navigate(['/pending']);
   }
  }, err => {
  console.log(err);
  });
}


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
}

updateOrder(order: IOrder): void {
  const index = this.orders.findIndex(item => item.order_id === order.order_id);
  this.orders[index] = order;
}

editOrder(order: any): Observable<any> {
  order.message = 'Pending for approval';
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

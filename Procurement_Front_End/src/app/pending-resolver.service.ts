import { Injectable } from '@angular/core';
import {OrderService} from './order.service';
import {IOrder} from './order';
import {environment} from '../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PendingResolverService implements Resolve<IOrder[]> {

  orderList: IOrder[] = [];
  constructor(private orderService: OrderService,
              private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<IOrder[]> | Promise<IOrder[]> | IOrder[] {
    const status = 'Pending';
    let statusParams = new HttpParams().set('status', status);
    return this.http.get<IOrder[]>(environment.BASE_URL + 'orders/Order_by_status', { params: statusParams });
  //   .subscribe((data: IOrder[]) => {
  //     console.log(data);
  //     for (let i of data) {
  //       this.orderList.push(i);
  //     }
  //  }, err => {
  //    console.log(err);
  //  });
  //   console.log(this.orderList);
  //   return this.orderList;
  }
}

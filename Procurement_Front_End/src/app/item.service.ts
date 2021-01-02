import { Injectable } from '@angular/core';
import { Item, IItem } from '../app/item';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  item: any = [];

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<any[]> {
    return this.http.get<any[]>(environment.BASE_URL + 'order/items');
  }

  getItemById(order_id: any): Observable<any[]> {
    let params = new HttpParams().set('order_id', order_id);
    return this.http.get<any[]>(environment.BASE_URL + 'order/Item_by_order_id', { params: params });
  }

  getItemByStatus(status: any, user: any): Observable<IItem[]> {
    let params = new HttpParams().set('status', status).set('userID', user);
    return this.http.get<IItem[]>(environment.BASE_URL + 'orders/Item_by_status', { params: params });
  }

  getItemByItemId(item_id: any): Observable<IItem> {
    let params = new HttpParams().set('id', item_id);
    return this.http.get<Item>(environment.BASE_URL + 'order/Item_by_item_id', { params: params });
  }

  trackItems(order_id: any): Observable<IItem> {
    let trackParams = new HttpParams().set('order_id', order_id);
    return this.http.get<Item>(environment.BASE_URL + 'orders/trackItems', { params: trackParams });
  }


}

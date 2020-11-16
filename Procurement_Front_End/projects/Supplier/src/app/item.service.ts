import { Injectable } from '@angular/core';
import { Item, IItem } from '../app/item';
import { Observable, of } from 'rxjs';
import {environment } from '../../../../src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  allItems: any = [];
  sampleItems: any = [];
  item: any = [];
  requestedItem: any;
  request: any = {};
  items: Array<Item> = [];

  constructor(private http: HttpClient) { }

  getItemById(item_id: any): Observable<IItem> {
    let IParams = new HttpParams().set('item_id', item_id);
    return this.http.get<IItem>(environment.BASE_URL + 'item/item_by_id', { params: IParams });
  }

  getAllItems() {
    return this.http.get(environment.BASE_URL + 'item/allItems');
  }

  replicateItem(item: any): Observable<any> {
    console.log(item);
    return this.http.post(environment.BASE_URL + 'item/items', item);
  }

  delItem(item_id: any): Observable<any> {
    let dParams = new HttpParams().set('item_id', item_id);
    console.log(this.request);
    return this.http.delete(environment.BASE_URL + 'item/deleteItems', {params: dParams});
  }

  editItem(item: any) {
    console.log(item);
    this.delItem(item.item_id).subscribe(data => {
      console.log(data);
      this.http.post(environment.BASE_URL + 'item/items', item).subscribe(data => {
        console.log(data);
      }, err => {
      console.log(err);
      });
    }, err => {
      console.log(err);
    });
  }

  addItemByCSV(item: any) {
    item.action = 'insert';
    console.log(item);
    this.http.post(environment.BASE_URL + 'item/items', item).subscribe(data => {
    console.log(data);
    }, err => {
    console.log(err);
    });
  }

  getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(environment.BASE_URL + 'item/allItems');
  }

  getItemCount(): Observable<number> {
    return this.http.get<number>(environment.BASE_URL + 'item/itemCount');
  }
}

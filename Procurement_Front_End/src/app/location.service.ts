import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  location: any = [];
  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + 'order/locations');
  }

  getLocationById(order_id: any): Observable<any> {
    let locParams = new HttpParams().set('order_id', order_id);
    return this.http.get<any>(environment.BASE_URL + 'orders/totalCost', {params: locParams});
  }

  getLocationSpent(location: string) {
    let locationParams = new HttpParams().set('location', location);
    return this.http.get<any>(environment.BASE_URL + 'orders/spentYearWise', {params: locationParams});
  }

  getLocationBudget(loc: string) {
    let locParams = new HttpParams().set('location', loc);
    return this.http.get<any>(environment.BASE_URL + 'orders/fetchBudget', {params: locParams});
  }

  getUniqueLocation(order_id: any) {
    let oParams = new HttpParams().set('order_id', order_id);
    return this.http.get<any>(environment.BASE_URL + 'orders/distinctLocation', {params: oParams});
  }

  getSpentLocDept(loc: string, dept: string) {
    let orderParams = new HttpParams().set('location', loc).set('department', dept);
    return this.http.get<any>(environment.BASE_URL + 'orders/spentLocDeptWise', {params: orderParams});
  }

  getUniqueLocDept() {
    return this.http.get<any>(environment.BASE_URL + 'orders/uniqueLocDept');
  }
}

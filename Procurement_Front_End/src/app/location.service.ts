import { Injectable } from '@angular/core';
import { Location, ILocation } from '../app/location';
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
    return this.http.get<any>(environment.BASE_URL + 'order/location_by_order_id', {params: locParams});
  }
}

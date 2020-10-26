import { Injectable } from '@angular/core';
import { Image, IImage } from '../app/image';
import { Observable, of } from 'rxjs';
import {environment} from '../../../../src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  image: any = [];
  requestedImage: any;
  private images: Array<Image> = [];
  constructor(private http: HttpClient) { }

  getImageById(item_id: any):Observable<any> {
    let params = new HttpParams().set('item_id', item_id);
    return this.http.get<any>(environment.BASE_URL + 'item/images_by_id', { params: params });
  }

  getAllImages():Observable<IImage[]> {
    return this.http.get<IImage[]>(environment.BASE_URL + 'item/allImages');
  }
}

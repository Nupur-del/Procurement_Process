import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Po3} from './po3';

@Injectable({
  providedIn: 'root'
})
export class Po3Service {

  constructor(private http: HttpClient) { }

  getMaxbillNo()
  {
    return this.http.get<Po3>('http://localhost/php-crud/po3.php');
  }

  new_po(po3: Po3)
  {
    console.log(po3);
    return this.http.post('http://localhost/php-crud/po_insert.php', po3);
  }
}

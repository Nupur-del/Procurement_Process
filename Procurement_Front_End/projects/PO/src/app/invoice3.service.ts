import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Invoice3 } from './invoice3';

@Injectable({
  providedIn: 'root'
})
export class Invoice3Service {

  constructor(private http: HttpClient) { }

getMaxinvoiceNo()
  {
    return this.http.get<Invoice3>('http://localhost/php-crud/invoice3.php');
  }
}
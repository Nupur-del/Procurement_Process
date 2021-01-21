import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('0');
  currentMessage = this.messageSource.asObservable();

  supplierID = new BehaviorSubject(null);

  constructor() { }

  changeMessage(message) {
    this.messageSource.next(message);
  }

  fetchId(id) {
    this.supplierID.next(id);
  }
}

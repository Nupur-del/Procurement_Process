import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSource = new BehaviorSubject('0');
  currentMessage = this.messageSource.asObservable();
  poData = new BehaviorSubject([]);
  poBillNo = new BehaviorSubject(0);

  constructor() { }

  changeMessage(message) {
    this.messageSource.next(message);
  }

  passData(data: any[]) {
    this.poData.next(data);
  }

  changeBillNo(bill: number) {
    this.poBillNo.next(bill);
  }

}

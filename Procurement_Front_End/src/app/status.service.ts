import { Injectable } from '@angular/core';
import { Status, IStatus } from '../app/status';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {


  private statuses:Array<Status> = [
    { order_id: 1232, status: 'pending', message: 'Request submitted for review'},
    { order_id: 3232, status: 'pending', message: 'Request submitted for review'},
    { order_id: 4545, status: 'pending', message: 'Request submitted for review'}
  ];

  constructor() { }

  getStatusById(order_id:number):Observable<IStatus>{
    var status = this.statuses.find(item => item.order_id === order_id);
    return of(status);
  }

  getAllStatus():Observable<IStatus[]>{
    return of(this.statuses);
  }

  addStatus(status:IStatus):void{
    this.statuses.sort(item => item.order_id);
    console.log(this.statuses);
    this.statuses.push(status);
  }

  deleteStatus(status:IStatus):IStatus[]{
    const index = this.statuses.findIndex(item => item.order_id === status.order_id);
    const deleteStatus = this.statuses.splice(index,1);

    return deleteStatus;
  }

  updateOrder(status:IStatus):void{

    const index=this.statuses.findIndex(item => item.order_id === status.order_id);
    this.statuses[index]= status;
  }
}

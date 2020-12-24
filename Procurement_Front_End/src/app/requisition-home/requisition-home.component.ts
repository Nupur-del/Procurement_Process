import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import {POService} from '../../../projects/PO/src/app/po.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-requisition-home',
  templateUrl: './requisition-home.component.html',
  styleUrls: ['./requisition-home.component.scss']
})
export class RequisitionHomeComponent implements OnInit {
  type: any;
  order: any = {};
  userID: number;
  po: any = {};
  statusDetatils = [];

  constructor(private orderService: OrderService,
              private http: HttpClient,
              private poService: POService) { }

  ngOnInit() {

    this.type = localStorage.getItem('type');
    this.userID = +localStorage.getItem('userId');

    this.orderService.getAllOrderCount(this.userID, this.type).subscribe((data: any) => {
      this.order.all = data;
    });
    const pendingStatus = 'Pending';
    this.orderService.getStatusOrderCount(pendingStatus, this.userID, this.type).subscribe((data: any) => {
      console.log(data.data);
      this.order.pending = data.data;
    });
    const approvedStatus = 'Approved';
    this.orderService.getStatusOrderCount(approvedStatus, this.userID, this.type).subscribe((data: any) => {
      this.order.approved = data.data;
    });
    const deniedStatus = 'Denied';
    this.orderService.getStatusOrderCount(deniedStatus, this.userID, this.type).subscribe((data: any) => {
      this.order.denied = data.data;
    });

    this.http.get(environment.BASE_URL + 'order/getStatus')
    .subscribe((data: any) => {
      this.statusDetatils = data;
      const status = this.statusDetatils.find(a => a.orderStatus === 'Pending').id;
      const denied = this.statusDetatils.find(b => b.orderStatus === 'PO Denied').id;
      this.poService.getStatusPOCount(status, this.type, this.userID).subscribe((data: any) => {
        this.po.pending = data.data;
      this.poService.getStatusPOCount(denied, this.type, this.userID).subscribe((data: any) => {
          this.po.denied = data.data;
        });
      });
    }, err => {
      console.log(err);
    });
    this.poService.getInprogressPoCount(this.type, this.userID).subscribe((data: any) => {
      this.po.approved = data.data;
      console.log(this.po.approved);
    });
  }

}

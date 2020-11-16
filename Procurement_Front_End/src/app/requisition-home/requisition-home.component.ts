import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-requisition-home',
  templateUrl: './requisition-home.component.html',
  styleUrls: ['./requisition-home.component.scss']
})
export class RequisitionHomeComponent implements OnInit {
  type: any;

  order: any = {};

  constructor(private orderService: OrderService) { }

  ngOnInit() {

    this.type = localStorage.getItem('type');

    this.orderService.getAllOrderCount().subscribe((data: any) => {
      this.order.all = data;
    });
    let pendingStatus = 'Pending';
    this.orderService.getStatusOrderCount(pendingStatus).subscribe((data: any) => {
      console.log(data.data);
      this.order.pending = data.data;
    });
    let approvedStatus = 'Approved'
    this.orderService.getStatusOrderCount(approvedStatus).subscribe((data: any) => {
      this.order.approved = data.data;
    });
  }

}

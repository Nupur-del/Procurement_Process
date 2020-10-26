import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {environment } from '../../../../../src/environments/environment';
import { MessageService } from '../message.service';
import { POService } from '../po.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CheckPOComponent } from '../check-po/check-po.component';

@Component({
  selector: 'app-potrack',
  templateUrl: './potrack.component.html',
  styleUrls: ['./potrack.component.scss']
})
export class POTrackComponent implements OnInit {

  item: any = {};
  sub: any;
  po = {
    behalf: '',
    billNo: null,
    bill_to_address: '',
    budget_code: '',
    cmp_name: '',
    comment: '',
    cost_center: '',
    currency: '',
    delivery_address: '',
    delivery_to: '',
    estimated_arrival: '',
    invoice_status: '',
    item_id: null,
    item_name: '',
    location: '',
    message: '',
    message_client: '',
    order_id: null,
    org_billed: '',
    po_status: '',
    price: null,
    project_code: '',
    purchase_type: '',
    quantity: null,
    reason: '',
    reqName: '',
    required_by: '',
    total: null,
    tracking_link: '',
    urg_msg: '',
};
  imageNames: any = [];
  isLinear = false;
  constructor(private router: Router,
              private message: MessageService,
              private poService: POService,
              private http: HttpClient,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.message.currentMessage.subscribe(message => this.sub = message);
    this.poService.getPoByBillNo(this.sub).subscribe((data: any) => {
      console.log(data);
      this.po = data[0];
      console.log('Po', this.po);
    });

    this.poService.getAttachmentsByBillNo(this.sub).subscribe((data: any) => {
      console.log(data);
      this.imageNames = data;
    });
  }

  send() {
    console.log('Po', this.po);
    this.item.billNo = this.sub;
    console.log('Order_id', this.po.order_id);
    this.item.order_id = this.po.order_id;
    console.log('Item_id', this.po.item_id);
    this.item.item_id = this.po.item_id;
    this.item.tracking_link = this.po.tracking_link;
    this.item.estimated_arrival = this.po.estimated_arrival;
    this.item.order_status = this.po.po_status;
    this.item.order_msg = this.po.message_client;
    console.log(this.item);
    this.http.put(environment.BASE_URL + 'Purchase_order/trackPO', this.item).
    subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/approvedPO']);
    }, err => {
    console.log(err);
    });
  }

  seePO() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxHeight = '90vh';
    const dialog = this.dialog.open(CheckPOComponent, dialogConfig);
  }
}

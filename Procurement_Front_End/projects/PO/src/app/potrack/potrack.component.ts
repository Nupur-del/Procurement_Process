import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {environment } from '../../../../../src/environments/environment';
import { MessageService } from '../message.service';
import { POService } from '../po.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {SeePOComponent} from '../see-po/see-po.component';
import { CheckPOComponent } from '../check-po/check-po.component';

@Component({
  selector: 'app-potrack',
  templateUrl: './potrack.component.html',
  styleUrls: ['./potrack.component.scss']
})
export class POTrackComponent implements OnInit {

  item: any = {};
  sub: any;
  po = [];
  imageNames: any = [];
  statusDetails = [];
  todayDate:Date = new Date();
  isLinear = false;
  constructor(private router: Router,
              private message: MessageService,
              private poService: POService,
              private http: HttpClient,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.message.poBillNo.subscribe(message => this.sub = message);
    this.http.get(environment.BASE_URL + 'order/getStatus').subscribe((sta: any) => {
      this.statusDetails = sta;
    this.poService.getPoByBillNo(this.sub).subscribe((data: any) => {
      console.log(data);
      this.po = data;
      console.log('Po', this.po);
    });
  });

    this.poService.getAttachmentsByBillNo(this.sub).subscribe((data: any) => {
      console.log(data);
      this.imageNames = data;
    });
  }

  send() {
    console.log('Po', this.po);
    this.item.billNo = this.sub;
    // console.log('Order_id', this.po.order_id);
    // this.item.order_id = this.po.order_id;
    // console.log('Item_id', this.po.item_id);
    // this.item.item_id = this.po.item_id;
    this.item.item = [];
    for (let i of this.po) {
      if (i.status === 8) {
        this.item.item.push({
          item_id: i.id,
          status: this.statusDetails.find(s => s.orderStatus === this.po[0].po_status).id
        })
      }
    }
    console.log(this.item.item);
    this.item.tracking_link = this.po[0].tracking_link;
    this.item.estimated_arrival = this.po[0].estimated_arrival as string;
    this.item.order_status = this.statusDetails.find(s => s.orderStatus === this.po[0].po_status).id;
    this.item.order_msg = this.po[0].message_client;
    console.log(this.item);
    console.log('Date', this.item.estimated_arrival);
    this.http.put(environment.BASE_URL + 'Purchase/poTrack', this.item).
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
    const dialog = this.dialog.open(SeePOComponent, dialogConfig);
  }
}

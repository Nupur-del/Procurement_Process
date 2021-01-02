import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {environment } from '../../../../../src/environments/environment';
import { MessageService } from '../message.service';
import { POService } from '../po.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {SeePOComponent} from '../see-po/see-po.component';
import {LoginService} from '../../../../../src/app/login.service';

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
  poStatus = [];
  statusDetails = [];
  todayDate:Date = new Date();
  isLinear = false;
  constructor(private router: Router,
              private message: MessageService,
              private poService: POService,
              private login: LoginService,
              private http: HttpClient,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.message.poBillNo.subscribe(message => this.sub = message);
    this.http.get(environment.BASE_URL + 'order/getStatus').subscribe((sta: any) => {
      this.statusDetails = sta;
    this.poService.getPoByBillNo(this.sub).subscribe((data: any) => {
      console.log(data);
      this.po = data;
      this.po[0].po_status = this.statusDetails.find(a => a.id === this.po[0].po_status).orderStatus;
      switch(this.po[0].po_status) {
        case 'PO Approved':
          this.poStatus = ['Order Processing'];
          break;
        case 'Order Processing':
          this.poStatus = ['Item Quality Check', 'Item Dispatched', 'Item Delivered'];
          break;
        case 'Item Quality Check':
          this.poStatus = ['Item Dispatched', 'Item Delivered'];
          break;
        case 'Item Dispatched':
          this.poStatus = ['Item Delivered'];
          break;
        default:
          this.poStatus = [];
      }
      this.po[0].arrival_date = new Date(this.po[0].arrival_date);
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
    this.item.item = [];
    for (let i of this.po) {
      if (i.status !== 6) {
        this.item.item.push({
          item_id: i.id,
          status: this.statusDetails.find(s => s.orderStatus === this.po[0].po_status).id
        })
      }
    }
    console.log(this.item.item);
    this.item.tracking_link = this.po[0].track;
    this.item.estimated_arrival = this.po[0].arrival_date as string;
    this.item.order_status = this.statusDetails.find(s => s.orderStatus === this.po[0].po_status).id;
    this.item.order_msg = this.po[0].message_client;
    console.log(this.item);
    console.log('Date', this.item.estimated_arrival);

    this.login.userEmail.subscribe(uEmail => {
      this.login.getUser('Requestor').subscribe((uDetails:any) => {
      this.login.userPassword.subscribe(uPassword => {
        if (!uEmail || !uPassword) {
          uEmail = localStorage.getItem('email');
          uPassword = localStorage.getItem('password');
        }
        let user = {
          email: uEmail,
          password: uPassword,
          tracking_link: this.item.tracking_link ,
          order_id: this.item.billNo,
          suppemail : uDetails.find(a => a.id === this.po[0].created_by).email,
          name : uDetails.find(a => a.id === this.po[0].created_by).name,
          user: localStorage.getItem('username')
      }
      if (this.po[0].po_status === 'Item Dispatched' || this.po[0].po_status === 'Item Delivered') {
        this.http.put(environment.BASE_URL + 'Purchase/poTrack', this.item).
        subscribe((data: any) => {
          console.log(data);
          this.http.post(environment.BASE_URL + 'sendmail', user).subscribe(
           (result: any) => {
             console.log(result);
             this.router.navigate(['/approvedPO']);
           },err => {
             console.log(err);
           });
        }, err => {
        console.log(err);
        });
      } else {
        this.http.put(environment.BASE_URL + 'Purchase/poTrack', this.item).
        subscribe((data: any) => {
          console.log(data);
             this.router.navigate(['/approvedPO']);
        }, err => {
        console.log(err);
        });
      }
      });
    });
    })
  }

  seePO() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxHeight = '90vh';
    const dialog = this.dialog.open(SeePOComponent, dialogConfig);
  }
}

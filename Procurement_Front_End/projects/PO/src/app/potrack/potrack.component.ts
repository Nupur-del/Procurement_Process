import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {environment } from '../../../../../src/environments/environment';
import { MessageService } from '../message.service';
import { POService } from '../po.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import {SeePOComponent} from '../see-po/see-po.component';
import {LoginService} from '../../../../../src/app/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-potrack',
  templateUrl: './potrack.component.html',
  styleUrls: ['./potrack.component.scss']
})
export class POTrackComponent implements OnInit, OnDestroy {

  @ViewChild('mainForm', {static: false}) poForm: NgForm;

  item: any = {};
  sub: any;
  todayDate = new Date();

  // Array
  po = [];
  imageNames: any = [];
  poStatus = [];
  statusDetails = [];

  // Subscription
  passwordSubscription : Subscription;
  emailSubscription: Subscription;
  statusSubscription: Subscription;
  poSubscription: Subscription;
  userSubscription: Subscription;
  TrackSubscription: Subscription;
  MailSubscription: Subscription;

  //boolean variable
  isSending = false;
  isLinear = false;

  constructor(private router: Router,
              private message: MessageService,
              private poService: POService,
              private login: LoginService,
              private snack: MatSnackBar,
              private http: HttpClient,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.message.poBillNo.subscribe(message => this.sub = message);

    this.statusSubscription = this.http.get(environment.BASE_URL + 'order/getStatus').subscribe((sta: any) => {
      this.statusDetails = sta;

      this.poSubscription = this.poService.getPoByBillNo(this.sub).subscribe((data: any) => {
      console.log(data);
      this.po = data;
      this.po[0].po_status = this.po[0].poStatus;
      switch(this.po[0].po_status) {
        case 'PO Approved':
          this.poStatus = ['PO Approved','Order Processing'];
          break;
        case 'Order Processing':
          this.poStatus = ['Order Processing','Item Quality Check', 'Item Dispatched', 'Item Delivered'];
          break;
        case 'Item Quality Check':
          this.poStatus = ['Item Quality Check','Item Dispatched', 'Item Delivered'];
          break;
        case 'Item Dispatched':
          this.poStatus = ['Item Dispatched','Item Delivered'];
          break;
        default:
          this.poStatus = [];
      }
      console.log(this.po[0].arrival_date);

      if (this.po[0].arrival_date) {
        this.po[0].arrival_date = this.formatDate(this.po[0].arrival_date );
        console.log(this.po[0].arrival_date);
      } else {
        this.po[0].arrival_date = '';
        console.log(this.po[0].arrival_date);
      }
      console.log('Po', this.po);
    });
  });

    this.poService.getAttachmentsByBillNo(this.sub).subscribe((data: any) => {
      console.log(data);
      this.imageNames = data;
    });
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

  send() {
    console.log(this.poForm);
    if ((this.po[0].po_status === 'Item Dispatched' || this.po[0].po_status === 'Item Delivered')
    && !this.po[0].track) {
        this.snack.open('Please mention the tracking link', '', {duration: 3000});
    } else {
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
     let newDate= new Date(this.item.estimated_arrival).toISOString();
    // newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
    this.item.estimated_arrival = newDate;

    this.emailSubscription  = this.login.userEmail.subscribe(uEmail => {

     this.userSubscription = this.login.getUser('Requestor').subscribe((uDetails:any) => {

        this.passwordSubscription = this.login.userPassword.subscribe(uPassword => {

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
          user: localStorage.getItem('username'),
          status: this.po[0].po_status
      }

      if (this.po[0].po_status === 'Item Dispatched' || this.po[0].po_status === 'Item Delivered') {

        this.isSending = true;

      this.TrackSubscription = this.http.put(environment.BASE_URL + 'Purchase/poTrack', this.item).subscribe((data: any) => {

       this.MailSubscription = this.http.post(environment.BASE_URL + 'sendmail', user).subscribe((result: any) => {

             this.isSending = false;
             this.snack.open('Notification has send to the Customer', '', {duration: 2000});

             if ( this.po[0].po_status === 'Item Delivered') {
              this.router.navigate(['/deliveredPO']);
             } else {
              this.router.navigate(['/approvedPO']);
             }

           },error => {
            this.isSending = false;
             console.log(error);
           });

        }, err => {
             console.log(err);
        });

      } else {
       this.TrackSubscription = this.http.put(environment.BASE_URL + 'Purchase/poTrack', this.item).subscribe((data: any) => {

          this.snack.open('Order Status got updated', '', {duration: 2000});
             this.router.navigate(['/approvedPO']);

           }, error1 => {
             console.log(error1);
           });
        }
       });
     });
    })
   }
  }

  seePO() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxHeight = '90vh';
    const dialog = this.dialog.open(SeePOComponent, dialogConfig);
  }

  ngOnDestroy() {
      if (this.emailSubscription) {
        this.emailSubscription.unsubscribe();
      }
      if (this.passwordSubscription) {
        this.passwordSubscription.unsubscribe();
      }
      if (this.TrackSubscription) {
        this.TrackSubscription.unsubscribe();
      }
      if (this.userSubscription) {
        this.userSubscription.unsubscribe();
      }
      if (this.MailSubscription) {
        this.MailSubscription.unsubscribe();
      }
      if (this.poSubscription) {
        this.poSubscription.unsubscribe();
      }
      if (this.statusSubscription) {
        this.statusSubscription.unsubscribe();
      }
  }
}

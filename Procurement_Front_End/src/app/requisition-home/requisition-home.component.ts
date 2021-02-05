import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router} from '@angular/router';
import {POService} from '../../../projects/PO/src/app/po.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoginService} from '../login.service';
import { Subscription, timer } from 'rxjs';
import {
  MatSnackBar,
  MatDialog,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-requisition-home',
  templateUrl: './requisition-home.component.html',
  styleUrls: ['./requisition-home.component.scss']
})
export class RequisitionHomeComponent implements OnInit, OnDestroy {
  type: any;
  order: any = {};
  userID: number;
  po: any = {};
  statusDetatils = [];
  notifiedCount: any;
  notifySub: Subscription;
  autoHide = 2000;
  suppDetails = [];
  id : any;
  pending = 0;
  com_name: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private orderService: OrderService,
              private http: HttpClient,
              private router: Router,
              private login: LoginService,
              public snackBar: MatSnackBar,
              private poService: POService) { }

  ngOnInit() {

    this.type = localStorage.getItem('type');
    this.userID = +localStorage.getItem('userId');

    // this.login.getCount().subscribe((count: any) => this.notifiedCount = count);
    if (this.type === 'Approver') {
      this.notifySub = timer(0, 300000).pipe(
        switchMap(() => this.login.getCount())
      ).subscribe(result => this.notifiedCount = result);
    }

    this.login.getNotified().subscribe(
      (i: any) => this.pending = i.count
    )

    this.login.getrows().subscribe((supp: any) => {
      if(supp.count > 0) {
        for(let i of supp.rows) {
          this.suppDetails.push(i.venVendorFK);
        }
        console.log(this.suppDetails);
      }
    });

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
      const delivered = this.statusDetatils.find(b => b.orderStatus === 'Item Delivered').id;
      this.poService.getStatusPOCount(status, this.type, this.userID).subscribe((data: any) => {
        this.po.pending = data.data;
      this.poService.getStatusPOCount(denied, this.type, this.userID).subscribe((data: any) => {
          this.po.denied = data.data;
      this.poService.getStatusPOCount(delivered, this.type, this.userID).subscribe((data: any) => {
          this.po.delivered = data.data;
           });
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

  view() {
    let viewData = {
      isviewed: true,
      id: this.suppDetails
    }
    this.http.put(environment.BASE_URL + 'supplier/updateView', viewData).subscribe(
      (data: any) => {
        console.log(data);
        this.pending = this.notifiedCount;
        this.notifiedCount = 0;
        this.router.navigate(['/SupplierApproval']);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  ngOnDestroy() {
    if(this.notifySub) {
      this.notifySub.unsubscribe();
    }
    if (this.id) {
      clearInterval(this.id);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Sort } from '@angular/material';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

import { MatTableDataSource } from '@angular/material';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../order.service';
import { LocationService } from '../location.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

  closeResult: string;
  isShow = true;
  order: any = {};
  orderList: any;
  sub: any;
  orderId: any;
  displayedColumns: string[] = ['order_id', 'created_by', 'date', 'order_desc', 'status', 'view'];
  message: string;
  actionButtonLabel = ':)';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  addExtraClass = false;
  dataSource: any;

  constructor(private router: Router,
              public http: HttpClient,
              public snackBar: MatSnackBar,
              private modalService: NgbModal,
              private data: DataService,
              private orderService: OrderService,
              private locationService: LocationService,
              private itemService: ItemService) { }

  ngOnInit() {
    this.orderService.getOrderByStatus('Pending').subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.orderList = data;
    });
    this.data.currentMessage.subscribe(message => this.sub = message);
  }

  onView(order_id) {
    console.log('Edit-' + order_id);
    this.sub = order_id;
    this.data.changeMessage(this.sub);
    this.router.navigate(['/view']);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ngOnInit();
      refresher.target.complete();
    }, 2000);
  }

  insert() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.insert();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  applySearch(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  sortOrder(sort: Sort) {
    const data = this.orderList.slice();
    if (!sort.active || sort.direction === '') {
        this.dataSource = data;
        return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
          case 'order_id': return this.compare(a.order_id, b.order_id, isAsc);
          case 'created_by': return this.compare(a.created_by, b.created_by, isAsc);
          case 'date': return this.compare(a.date, b.date, isAsc);
          default: return 0;
      }
    });

  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { MessageService } from '../../../projects/PO/src/app/message.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DataService as DataViewService } from '../../../projects/PO/src/app/data.service';
import { SeeOrderComponent } from '../../../projects/PO/src/app/see-order/see-order.component';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from '../data.service';
import {MatPaginator} from '@angular/material/paginator';
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
  selector: 'app-denied',
  templateUrl: './denied.component.html',
  styleUrls: ['./denied.component.scss']
})
export class DeniedComponent implements OnInit {

  closeResult: string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  isShow = true;
  itemId: any;
  finalItem: any[] = [];
  multiLocs: any[] = [];
  order: any = {};
  orderList: any;
  sub: any;
  orderId: any;
  displayedColumns: string[];
  viewItem = {
    comment: '',
    currency: '',
    custom: '',
    estimated_arrival: '',
    id: null,
    name: '',
    order_id: '',
    prefered_vendor: '',
    price: null,
    quantity: null,
    specification: '',
    status: '',
    tracking_link: '',
    unit_type: ''
  };

  message: string;
  actionButtonLabel = ':)';
  action = true;
  userID: number;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  type: string;
  addExtraClass = false;
  dataSource: any;

  constructor(private router: Router,
              public http: HttpClient,
              public snackBar: MatSnackBar,
              private dataView: DataViewService,
              private modalService: NgbModal,
              private data: DataService,
              private login: LoginService,
              private orderService: OrderService,
              private messageService: MessageService,
              private dialog: MatDialog,
              private locationService: LocationService,
              private itemService: ItemService) { }

  ngOnInit() {
    this.type = localStorage.getItem('type');
    this.userID = +localStorage.getItem('userId');

    if (this.type === 'Requestor') {
      this.displayedColumns = ['order_id', 'created_by', 'approved_by',
      'date', 'order_desc', 'Details', 'total_cost', 'replicate', 'status'];
    } else {
      this.displayedColumns = ['order_id', 'created_by', 'approved_by', 'date', 'order_desc', 'Details', 'total_cost', 'status'];
    }

    this.orderService.getOrderByStatus('Denied', this.userID, this.type).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.orderList = data;
    });
    this.messageService.currentMessage.subscribe(message => this.itemId = message);
    this.itemService.getItemByItemId(this.itemId).subscribe((data: any) => {
      this.viewItem = data[0];
    });
    this.data.currentMessage.subscribe(message => this.sub = message);
  }

  onView(order_id) {
    console.log('Edit-' + order_id);
    this.sub = order_id;
    this.data.changeMessage(this.sub);
    this.router.navigate(['/order']);
  }

  seeOrder(orderId) {
    this.itemId = orderId;
    const id = '0';
    this.messageService.changeMessage(this.itemId);
    this.dataView.changeMessage(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxHeight = '90vh';
    const dialog = this.dialog.open(SeeOrderComponent, dialogConfig);
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

  deleteRequest(id, refresher) {
    console.log('Order Id', id);
    let deleteParams = new HttpParams().set('order_id', id);
    this.http.delete(environment.BASE_URL + 'order/removeOrder', {params: deleteParams})
    .subscribe(
      data => {
         console.log(data);
         this.message = 'Deleted Sucessfully';
         this.insert();
         this.doRefresh(refresher);
     },
     err => {
         this.message = 'Deletion failed';
         this.insert();
         console.log(err);
    });
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.insert();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onReplicate(order_id, refresher) {

    this.finalItem = [];
    this.order = this.orderList.filter(order => order.order_id === order_id);
    this.order = this.order[0];
    this.order.creator = this.userID;
    this.itemService.getItemById(order_id).subscribe((data: any) => {
      console.log(data);
      for (let i of data) {
        console.log(i.supplier);
        this.finalItem.push({
          name: i.name,
          specification: i.specification,
          prefered_vendor: i.prefered_vendor,
          quantity: i.quantity,
          location: i.location,
          department: i.department,
          unit_type: i.unit_type,
          price: i.price,
          brand: i.brand,
          currency: i.currency,
          comment: i.comment
        });
      }
      console.log(this.finalItem);
      this.order.finalItem = this.finalItem;
      console.log('Replicated Order', this.order);
      this.orderService.replicateOrder(this.order, 'Denied');
      this.message = 'Replicated Sucessfully';
      this.insert();
    }, err => {
      console.log(err);
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
          case 'approved_by': return this.compare(a.approved_by, b.approved_by, isAsc);
          case 'date': return this.compare(a.date, b.date, isAsc);
          case 'total_price': return this.compare(a.total_price, b.total_price, isAsc);
          default: return 0;
      }
    });
  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

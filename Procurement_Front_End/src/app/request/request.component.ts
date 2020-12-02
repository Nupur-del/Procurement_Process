import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../../../projects/PO/src/app/message.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from '../data.service';
import { SeeOrderComponent } from '../../../projects/PO/src/app/see-order/see-order.component';
import { DataService as DataViewService } from '../../../projects/PO/src/app/data.service';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { environment } from '../../environments/environment';
import { OrderService } from '../order.service';
import { LocationService } from '../location.service';
import { ItemService } from '../item.service';
import { BudgetService } from '../budget.service';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatTableDataSource,
  MatDialog,
  MatDialogConfig,
  Sort
} from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})

export class RequestComponent implements OnInit {

  // State Management

  isDelivered  = false;
  isShow = true;
  action = true;
  setAutoHide = true;
  addExtraClass = false;

  // Variables

  closeResult: string;
  sub: any;
  itemId: any;
  type: any;
  locations: any;
  items: any;
  public lowBudgetDept = '';
  public lowBudget = 0;
  interval: any;
  dataSource: any;
  message: string;
  public itemValue  = 0;
  actionButtonLabel = ':)';
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  // Objects

  public order: any = {};

  // Arrays

  public sorderList: any = [ ];
  public uniqueLocDept: any = [];
  public locationList: any = [ ];
  public itemList: any = [ ];
  public delOrder: any = [ ];
  public delLocation: any = [ ];
  budgetAfterApproving: any[] = [];
  public delItem: any = [ ];
  public orderList: any = [];
  public multiLocs: any = [ ];
  public finalItem: any = [ ];
  displayedColumns: string[];

  // Subscription

  orderSub: Subscription;
  itemSub: Subscription;
  locationSub: Subscription;
  messageSub: Subscription;

  constructor(private router: Router,
              public http: HttpClient,
              public snackBar: MatSnackBar,
              private data: DataService,
              public dialog: MatDialog,
              private dataView: DataViewService,
              private messageService: MessageService,
              private orderService: OrderService,
              private locationService: LocationService,
              private itemService: ItemService,
              private budgetService: BudgetService) {
              }

  ngOnInit() {
    this.type = localStorage.getItem('type');

    if (this.type === 'Requestor') {
      this.displayedColumns = ['order_id', 'created_by', 'date', 'order_desc',
                     'status', 'edit', 'total_cost', 'Details','delete', 'replicate', 'mark_complete'];
     } else {
       this.displayedColumns = ['order_id', 'created_by', 'date', 'order_desc',
                     'status', 'requestor', 'total_cost', 'Details'];
     }
    this.orderSub = this.orderService.getAllOrders().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.orderList = data;
    });

    this.itemSub = this.itemService.getAllItems().subscribe((data: any) => {
      this.itemList = data.data;
    });

    this.locationSub = this.locationService.getAllLocations().subscribe((data: any) => {
      this.locationList = data.data;
      console.log('Location', this.locationList);
    });
    // this.checkBuget();

    this.messageSub = this.data.currentMessage.subscribe(message => this.sub = message);
  }

  private checkBuget() {
    this.uniqueLocDept = [];
    this.budgetAfterApproving = [];
    this.locationService.getUniqueLocDept().subscribe((loc: any) => {
      this.uniqueLocDept = loc;
      console.log('Unique', this.uniqueLocDept);
      for (let location of this.uniqueLocDept) {
      this.locationService.getSpentLocDept(location.location, location.department).subscribe(spent => {
        const exp = spent[0].total_spent === null ? 0 : spent[0].total_spent;
        console.log(exp);
        this.budgetService.getBudgetByDept(location.department, location.location).subscribe((result: any) => {
            this.budgetAfterApproving.push({
                  department: location.department,
                  location: location.location,
                  budget: (+result.current_balance - +exp)
            });
          }, err => {
            console.log(err);
          });
        }, err => {
          console.log(err);
        });
      }
    }, err => {
      console.log(err);
    });
    console.log('BudgetLocDept', this.budgetAfterApproving);
  }

  onEdit(order_id) {
    console.log('Edit-' + order_id);
    this.sub = order_id;
    this.data.changeMessage(this.sub);
    this.router.navigate(['/edit']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {
        name: this.lowBudgetDept,
        budget: this.lowBudget
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openMessageDialog(): void {
    const Ref = this.dialog.open(MessageDialogComponent, {
      data: {
        message: `Some of the items could not added due to low budget`
      }
    });
    Ref.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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


  onReplicate(order_id, refresher) {

    this.finalItem = [];
    this.multiLocs = [];
    this.lowBudgetDept = '';
    this.lowBudget = 0;

    this.order = this.orderList.filter(order => order.order_id === order_id);
    this.order = this.order[0];
    this.items = this.itemList.filter(item => item.order_id === order_id);
    this.locations = this.locationList.filter(location => location.order_id === order_id);

    for (let item of this.items) {
      let i: any = {};
      i.name = item.name;
      i.specification = item.specification;
      i.prefered_vendor = item.prefered_vendor;
      i.quantity = item.quantity;
      i.location = item.location;
      i.department = item.department;
      i.unit_type = item.unit_type;
      i.price = item.price;
      i.currency = item.currency;
      i.comment = item.comment;
      this.finalItem.push(i);
    }

    for (let location of this.locations) {
      let l: any = {};
      // const i = this.budgetAfterApproving.findIndex(exist =>
      //           exist.location === location.location && exist.department === location.department);
      // if (location.total_price > +this.budgetAfterApproving[i].budget) {
      //         this.lowBudgetDept = location.department;
      //         this.lowBudget = this.budgetAfterApproving[i].budget - location.total_price;
      // } else {
      //         const filteredItem = this.items.filter(product => product.location === location.location &&
      //                                       product.department === location.department);
      //         for (let item of filteredItem) {
      //           let i: any = {};
      //           i.name = item.name;
      //           i.specification = item.specification;
      //           i.prefered_vendor = item.prefered_vendor;
      //           i.quantity = item.quantity;
      //           i.location = item.location;
      //           i.department = item.department;
      //           i.unit_type = item.unit_type;
      //           i.price = item.price;
      //           i.currency = item.currency;
      //           i.comment = item.comment;
      //           this.finalItem.push(i);
      //       }
      l.location = location.location;
      l.total_price = location.total_price;
      l.department = location.department;
      this.multiLocs.push(l);
      // }
    }

    // if (this.finalItem.length === 0 && this.multiLocs.length === 0 && this.lowBudgetDept !== '') {
    //    this.openDialog();
    // } else if ( this.finalItem.length > 0 && this.multiLocs.length > 0) {
    //     if (this.lowBudgetDept !== '') {
    //         this.openMessageDialog();
    //     }
    this.order.finalItem = this.finalItem;
    this.order.multiLocs = this.multiLocs;
    this.orderService.replicateOrder(this.order);
    this.message = 'Replicated Sucessfully';
    // this.checkBuget();
    this.insert();
    // }
    this.doRefresh(refresher);
  }

  onDelete(id, refresher) {
    // const locExist  = this.locationList.filter(e => e.order_id === id);
    // const temarray = [];
    // for (let a of locExist) {
    //    const locIndex = this.budgetAfterApproving.findIndex(loc => loc.location === a.location &&
    //     loc.department === a.department);
    //    temarray.push({
    //      location: a.location,
    //      department: a.department,
    //      budget: this.budgetAfterApproving[locIndex].budget + a.total_price
    //    });
    // }
    // console.log('UpdateBudgetAfterDelete', temarray);
    console.log('Order Id', id);
    let deleteParams = new HttpParams().set('order_id', id);
    this.orderSub =  this.http.delete(environment.BASE_URL + 'order/removeOrder', {params: deleteParams})
                    .subscribe(
                    data => {
                      this.message = 'Deleted Sucessfully';
                      // console.log(this.orderList);
                      // const i  = this.orderList.filter(e => e.order_id === id);
                      // console.log(i);
                      // for ( let j of temarray) {
                      //   this.budgetService.updateBudget(j.department, j.location, j.budget);
                      // }
                      // this.checkBuget();
                      this.insert();
                      this.doRefresh(refresher);
                    },
                    err => {
                      this.message = 'Deletion failed';
                      this.insert();
                      console.log(err);
                    });
  }

  getData() {
   this.orderSub = this.orderService.getAllOrders().subscribe((data: any[]) => {
      this.orderList = data;
      this.dataSource = new MatTableDataSource(this.orderList);
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ngOnInit();
      // refresher.target.complete();
    }, 2000);
  }

  insert() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }

  getOrder(order_id: any) {
   this.orderSub = this.orderService.getOrderById(order_id).subscribe( data => {
      this.sorderList = data;
      console.log('Order List-', this.sorderList);
      this.order.created_by = this.sorderList.created_by;
      this.order.date = this.sorderList.date;
      this.order.order_desc = this.sorderList.order_desc;
      this.order.status = 'Pending';
      this.order.message = 'Request submitted for review';
    });
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
          case 'total_price': return this.compare(a.total_price, b.total_price, isAsc);
          default: return 0;
      }
    });

  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onTrack(order_id: any) {
    this.sub = order_id;
    this.data.changeMessage(this.sub);
    this.router.navigate(['/track-order']);
  }

  onComplete(order_id, refresher) {
   this.orderSub =  this.orderService.getStatusById(order_id).subscribe( data => {
      console.log(data);
      const orderData = {
        color: 'accent',
        order_id: order_id,
        status: 'Completed'
      };

      if (data['status'] === 'Item Delivered') {
        this.orderService.updateColor(orderData).subscribe(data => {
          console.log(data);
          this.doRefresh(refresher);
        });
      } else {
        alert('Item has not yet Delivered');
      }
    });
  }
}

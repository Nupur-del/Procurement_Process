import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';
import { OrderService } from '../order.service';
import { LocationService } from '../location.service';
import { ItemService } from '../item.service';
import { StatusService } from '../status.service';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatTableDataSource,
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
  locations: any;
  items: any;
  interval: any;
  dataSource: any;
  message: string;
  actionButtonLabel = ':)';
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  // Objects

  public order: any = {};

  // Arrays

  public sorderList: any = [ ];
  public locationList: any = [ ];
  public itemList: any = [ ];
  public delOrder: any = [ ];
  public delLocation: any = [ ];
  public delItem: any = [ ];
  public orderList: any = [];
  public multiLocs: any = [ ];
  public finalItem: any = [ ];
  displayedColumns: string[] = ['order_id', 'created_by', 'date', 'order_desc',
                                'status', 'edit', 'delete', 'replicate', 'mark_complete'];

  // Subscription

  orderSub: Subscription;
  itemSub: Subscription;
  locationSub: Subscription;
  messageSub: Subscription;

  constructor(private router: Router,
              public http: HttpClient,
              public snackBar: MatSnackBar,
              private data: DataService,
              private orderService: OrderService,
              private locationService: LocationService,
              private itemService: ItemService,
              private statusService: StatusService) { }

  ngOnInit() {
    this.orderSub = this.orderService.getAllOrders().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.orderList = data;
    });

    this.itemSub = this.itemService.getAllItems().subscribe((data: any) => {
      this.itemList = data.data;
    });

    this.locationSub = this.locationService.getAllLocations().subscribe((data: any) => {
      this.locationList = data.data;
    });

    this.messageSub = this.data.currentMessage.subscribe(message => this.sub = message);
  }

  onEdit(order_id) {
    console.log('Edit-' + order_id);
    this.sub = order_id;
    this.data.changeMessage(this.sub);
    this.router.navigate(['/edit']);
  }

  onReplicate(order_id, refresher) {

    console.log(refresher);
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
      i.custom = item.custom;
      i.comment = item.comment;
      this.finalItem.push(i);
    }

    for (let location of this.locations) {
      let l: any = {};
      l.location = location.location;
      l.department = location.department;
      this.multiLocs.push(l);
    }

    console.log('order-', this.order);
    console.log('item-', this.finalItem);
    console.log('location-', this.multiLocs);

    this.order.finalItem = this.finalItem;
    this.order.multiLocs = this.multiLocs;
    console.log(this.order);

    this.orderService.replicateOrder(this.order);
    this.message = 'Replicated Sucessfully';
    this.insert();
    this.doRefresh(refresher);
  }

  onDelete(id, refresher) {
    console.log('Order Id', id);
    let deleteParams = new HttpParams().set('order_id', id);
    this.orderSub =  this.http.delete(environment.BASE_URL + 'order/removeOrder', {params: deleteParams})
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

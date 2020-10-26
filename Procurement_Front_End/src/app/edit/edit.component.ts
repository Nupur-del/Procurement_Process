import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from '../data.service';
import { OrderService } from '../order.service';
import { LocationService } from '../location.service';
import { environment } from '../../environments/environment';
import { ItemService } from '../item.service';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

import { BudgetService } from '../budget.service';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit {

  sub: any;
  public orderList: any = [ ];
  public locationList: any = [ ];
  public itemList: any = [ ];
  closeResult: string;
  isShow = true;
  new = true;
  catalogDisplay = true;
  change = true;
  toggleSelected = true;
  option: string;
  order: any = {};
  public multiLocs: any = [ ];
  public budget: any = [ ];
  public finalItem: any = [ ];
  public selectedCatalog: any = [ ];
  public itemValue = 0;
  public lowBudgetDept = '';
  public items: any[] = [{
    name: '',
    specification: '',
    prefered_vendor: '',
    quantity: '',
    unit_type: '',
    price: '',
    currency: '',
    custom_type: '',
    comment: ''
  }];
  public catalogItems: any[] = [{
    name: '',
    specification: '',
    prefered_vendor: '',
    quantity: '',
    unit_type: '',
    price: '',
    currency: '',
    custom: '',
    comment: ''
  }];
  public catalog: any[] = [{
    name: 'Desktop',
    specification: '15 inch',
    prefered_vendor: 'Dell',
    quantity: '2',
    unit_type: 'DX-2323',
    price: '23000',
    currency: 'INR',
    custom: 'Windows',
    comment: 'Full Setup'
  },
  {
    name: 'Desktop',
    specification: '13 inch',
    prefered_vendor: 'HP',
    quantity: '2',
    unit_type: 'HP-733',
    price: '25000',
    currency: 'INR',
    custom: 'Windows',
    comment: 'Full Setup'
  },
  {
    name: 'Hard Drive',
    specification: '1 TB',
    prefered_vendor: 'Toshiba',
    quantity: '3',
    unit_type: 'T-3232',
    price: '3500',
    currency: 'INR',
    custom: 'USB-3.0',
    comment: ''
  },
  {
    name: 'Hard Drive',
    specification: '1 TB',
    prefered_vendor: 'Segate',
    quantity: '3',
    unit_type: 'S-323',
    price: '3000',
    currency: 'INR',
    custom: 'USB-3.0',
    comment: ''
  },
  {
    name: 'Wireless Router',
    specification: 'Mid Range',
    prefered_vendor: 'Cisco',
    quantity: '4',
    unit_type: 'C-4324',
    price: '1200',
    currency: 'INR',
    custom: 'None',
    comment: 'Reliable'
  },
  {
    name: 'Wireless Router',
    specification: 'Mid Range',
    prefered_vendor: 'Asus',
    quantity: '4',
    unit_type: 'A-4324',
    price: '1300',
    currency: 'INR',
    custom: 'None',
    comment: 'Reliable'
  },
  {
    name: 'Printer',
    specification: 'Ink Jet',
    prefered_vendor: 'HP',
    quantity: '3',
    unit_type: 'HP-2432',
    price: '3200',
    currency: 'INR',
    custom: 'With Extra Catridge',
    comment: 'Reliable'
  }
];
  public productNames: string[] = ['Desktop', 'Hard Drive', 'Wireless Router', 'Printer'];
  name: string;
  department: string;
  date: Date;
  // tslint:disable-next-line: variable-name
  order_desc: string;
  cities: string[] = [
    'Mumbai', 'Chennai', 'Delhi', 'Hyderabad', 'Bengalore', 'Pune'
  ];
  departments: string[] = [
    'IT', 'Electrical', 'HR', 'Management', 'Technical', 'Testing'
  ];

  message: string;
  actionButtonLabel = ':)';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  addExtraClass = false;

  constructor(private router: Router,
              private http: HttpClient,
              private data: DataService,
              public snackBar: MatSnackBar,
              private orderService: OrderService,
              private locationService: LocationService,
              private itemService: ItemService,
              private budgetService: BudgetService,
              public dialog: MatDialog) { }


  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.sub = message);
    this.orderService.getOrderById(this.sub).subscribe((data: any) => {
      this.order = data[0];
    });

    this.orderService.getStatusById(this.sub).subscribe((data: any) => {
      this.order.status = data.status;
      this.order.message = data.message;
    });

    this.itemService.getItemById(this.sub).subscribe((data) => {
      this.itemList = data;
      console.log('item data-', data);
      for (const item of this.itemList) {
        this.finalItem.push(item);
        this.itemValue = this.itemValue + ((+item.quantity) * (+item.price));
        console.log('Item price-', this.itemValue);
      }
    });

    this.locationService.getLocationById(this.sub).subscribe((data) => {
      this.locationList = data;
      console.log('location data-', data);
      for (const location of this.locationList) {
        this.multiLocs.push(location);
        this.budgetService.getBudgetByDept(location.department, location.location).subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {
          this.budget.push(data.budget);
          console.log('Dept Budget-', this.budget);
        });
      }
    });

    console.log(this.sub);
    this.order.order_id = this.sub;
  }

  // tslint:disable-next-line: variable-name
  getOrder(order_id: any) {
    this.orderService.getOrderById(order_id).subscribe( data => {
      this.orderList = data;
      console.log('order data-', this.orderList);
      this.order.created_by = this.orderList.created_by;
      this.order.date = this.orderList.date;
      this.order.order_desc = this.orderList.order_desc;
      this.order.status = 'pending';
      this.order.message = 'Request submitted for review';
    });
  }


  // tslint:disable-next-line: variable-name
  getLocation(order_id: any) {
    this.locationService.getLocationById(order_id).subscribe((data) => {
      this.locationList = data;
      console.log('location data-', data);
      for (const location of this.locationList) {
        this.multiLocs.push(location);
        // tslint:disable-next-line: no-shadowed-variable
        this.budgetService.getBudgetByDept(location.department, location.location).subscribe(data => {
          this.budget.push(data.budget);
          console.log('Dept Budget-', this.budget);
        });
      }
    });
  }

  // tslint:disable-next-line: variable-name
  getItem(order_id: any) {
    this.itemService.getItemById(order_id).subscribe((data) => {
      this.itemList = data;
      console.log('item data-', data);
      for (const item of this.itemList) {
        this.finalItem.push(item);
        this.itemValue = this.itemValue + ((+item.quantity) * (+item.price));
        console.log('Item price-', this.itemValue);
      }
    });
  }

  addItems() {
    this.items.push({
    name: '',
    specification: '',
    prefered_vendor: '',
    quantity: '',
    unit_type: '',
    price: '',
    currency: '',
    custom_type: '',
    comment: ''
    });
  }

  addLoc() {
    this.multiLocs.push({
    location: '',
    department: '',
    });
  }

  removeItems(i: number) {
    this.items.splice(i, 1);
  }

  logValue() {
    console.log(this.items);
  }
  // tslint:disable-next-line: variable-name
  locValue(order_id, loc, dept) {
    this.multiLocs.push({
      // tslint:disable-next-line: object-literal-shorthand
      order_id: order_id,
      location: loc,
      department: dept,
      });
    this.budgetService.getBudgetByDept(dept, loc).subscribe(data => {
        this.budget.push(data.budget);
      });
    console.log('Dept Budget-', this.budget);
    console.log(this.multiLocs);
    this.change = !true;
  }

  removeLoc(i: number) {
    this.budget.splice(i, 1);
    console.log('Dept Budget-', this.budget);
    this.lowBudgetDept = '';
    this.multiLocs.splice(i, 1);
  }

  addCatItems() {
    this.catalogItems.push({
    name: '',
    specification: '',
    prefered_vendor: '',
    quantity: '',
    unit_type: '',
    price: '',
    currency: '',
    custom_type: '',
    comment: ''
    });
  }

  removeCatItems(i: number) {
    this.catalogItems.splice(i, 1);
  }

  logCatValue() {
    console.log(this.catalogItems);
  }
  insert(item: any) {
    item.order_id = this.order.order_id;
    this.logValue();
    this.finalItem.push(item);
    this.toggleSelected = !true;
  }
  insertSnack() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
    this.router.navigate(['/request']);
  }
  toggleDisplay(product: string) {
    this.isShow = false;
    console.log('product name', product);
    this.selectedCatalog = this.catalog.filter(item => item.name === product);
    console.log('products-', this.selectedCatalog);
  }
  orderItem(product: any) {
    product.order_id = this.order.order_id;
    console.log('product- ', product);
    this.itemValue = this.itemValue + ((+product.quantity) * (+product.price));
    console.log('Item price-', this.itemValue);
    // tslint:disable-next-line: prefer-const
    for (var budget of this.budget) {
      if (this.itemValue > budget.budget) {
        this.lowBudgetDept = budget.department;
        this.itemValue = this.itemValue - ((+product.quantity) * (+product.price));
        console.log('Item price-', this.itemValue);
        break;
        }
      }
    if (this.lowBudgetDept === '') {
        this.finalItem.push(product);
        this.toggleSelected = !true;
      } else {
      console.log('low budget dept- ', this.lowBudgetDept);
      this.openDialog();
  }
  }
  removeOrderItem(i: number, item: any) {
    this.finalItem.splice(i, 1);
    this.lowBudgetDept = '';
    this.itemValue = this.itemValue - ((+item.quantity) * (+item.price));
    console.log('Item price-', this.itemValue);
  }
  itemSelect(option: any) {
    console.log('option', option);
    if (option === 'new') {
      this.new = false;
      this.catalogDisplay = true;
    } else if (option === 'catalog') {
      this.new = true;
      this.catalogDisplay = false;
    }
  }

  updateOrder(refresher) {
    this.order.multiLocs = this.multiLocs;
    this.order.finalItem = this.finalItem;
    let deleteParams = new HttpParams().set('order_id', this.order.order_id);
    this.http.delete(environment.BASE_URL + 'order/removeOrder', {params: deleteParams})
      .subscribe(
        data => {
           console.log(data);
           this.orderService.editOrder(this.order).subscribe(
            data => {
              console.log(data);
              this.message = 'Order Updated Sucessfully';
              this.insertSnack();
              this.router.navigate(['/request']);
            },
            err => {
              console.log(err);
            });
       },
       err => {
           console.log(err);
    });
  }

  doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        setTimeout(() => {
          console.log('Async operation has ended');
          this.ngOnInit();
          refresher.target.complete();
        }, 2000);
      }

  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {name: this.lowBudgetDept}

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { OrderService, OrdData } from '../order.service';
import { LocationService } from '../location.service';
import { ItemService } from '../item.service';
import { BudgetService } from '../budget.service';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

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
  public itemValue: number = 0;
  public lowBudgetDept: string = '';
  public items: any[] = [{
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
    quantity: '3',
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
  location: any = {};
  order_desc: string;
  today = new Date();
  dd = String(this.today.getDate()).padStart(2, '0');
  mm = String(this.today.getMonth() + 1).padStart(2, '0');
  yyyy = this.today.getFullYear();
  d1 = this.yyyy + '-' + this.mm + '-' + this.dd;
  cities: string[] = [
    'Mumbai', 'Chennai', 'Delhi', 'Hyderabad', 'Bengalore', 'Pune'
  ];
  departments: string[] = [
    'IT', 'Electrical', 'HR', 'Management', 'Technical', 'Testing'
  ];
  message = 'Item Added Successfully!';
  actionButtonLabel = ':)';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  addExtraClass = false;

  constructor(public snackBar: MatSnackBar,
              private modalService: NgbModal,
              public http: HttpClient,
              public router: Router,
              private orderService: OrderService,
              private locationService: LocationService,
              private itemService: ItemService,
              private budgetService: BudgetService,
              public dialog: MatDialog) { }

  ngOnInit() {}

  addItems() {
    this.items.push({
    name: '',
    specification: '',
    prefered_vendor: '',
    quantity: '',
    unit_type: '',
    price: '',
    currency: '',
    custom: '',
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

  locValue(loc, dept) {
    this.multiLocs.push({
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
    custom: '',
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
    this.logValue();
    item.order_id = this.order.order_id;
    console.log(item.order_id);
    this.finalItem.push(item);
    this.toggleSelected = !true;
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.logCatValue();
      this.logValue();
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
  toggleDisplay(product: string) {
    this.isShow = false;
    console.log('product name', product);
    this.selectedCatalog = this.catalog.filter(item => item.name === product);
    console.log('products-', this.selectedCatalog);
  }
  orderItem(product: any) {
    console.log('product- ', product);
    this.itemValue = this.itemValue + ((+product.quantity) * (+product.price));
    console.log('Item price-', this.itemValue);
    for(var budget of this.budget) {
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
    if (option === 'new')
    {
      this.new = false;
      this.catalogDisplay = true;
    } else if (option === 'catalog') {
      this.new = true;
      this.catalogDisplay = false;
    }
  }
  addOrder() {
    this.order.order_id = Math.floor(Math.random() * 10000) + 1;
    this.order.date = this.d1;
    this.order.multiLocs = this.multiLocs;
    this.order.finalItem = this.finalItem;
    this.order.status = 'Pending';
    this.order.message = 'Pending for approval';

    console.log('Actual Order', this.order);
    this.http.post(environment.BASE_URL + 'order/order', this.order).subscribe((data: any) =>{
      console.log(data);
      this.router.navigate(['/request']);
    }, err => {
        console.log(err);
        });
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

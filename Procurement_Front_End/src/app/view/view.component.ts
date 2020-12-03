import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatSnackBar
} from '@angular/material';
import { HttpClient} from '@angular/common/http';
import { DataService } from '../data.service';
import { OrderService} from '../order.service';
import { BudgetService } from '../budget.service';
import { LocationService } from '../location.service';
import { ItemService } from '../item.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  sub: any;
  public orderList: any = [ ];
  public locationList: any = [ ];
  public itemList: any = [ ];
  closeResult: string;
  isShow = true;
  budget: any = [];
  locationBudget: any[] = [];
  budgetAfterApproving: any[] = [];
  new = true;
  catalogDisplay = true;
  decision: any;
  change = true;
  toggleSelected = true;
  option: string;
  interval: any;
  order: any = {};

  public multiLocs: any = [ ];
  public finalItem: any = [ ];
  public selectedCatalog: any = [ ];
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

  public catalog: any[] = [];

  public productNames: string[] = ['Desktop', 'Hard Drive', 'Wireless Router', 'Printer'];
  name: string;
  department: string;
  date: Date;
  order_desc: string;
  cities: string[] = [
    'Mumbai', 'Chennai', 'Delhi', 'Hyderabad', 'Bengalore', 'Pune'
  ];
  departments: string[] = [
    'IT', 'Electrical', 'HR', 'Management', 'Technical', 'Testing'
  ];

  constructor(private router: Router,
              public snackBar: MatSnackBar,
              private http: HttpClient,
              private data: DataService,
              private budgetService: BudgetService,
              private orderService: OrderService,
              private locationService: LocationService,
              private itemService: ItemService) { }


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
      console.log('item data', data);
      for (const item of this.itemList) {
        this.finalItem.push(item);
      }
    });

    let temparray: any = [];
    this.locationService.getLocationById(this.sub).subscribe((data) => {
      this.locationList = data;
      console.log('location data', data);
      for (let location of this.locationList) {
        // this.locationService.getSpentLocDept(location.location, location.department).subscribe(spent => {
        //   temparray.push(spent[0]);
          this.budgetService.getBudgetByDept(location.department, location.location).subscribe((result: any) => {
            this.budget.push(result);
            const remain = (+result.budget - +location.total_price);
            this.budgetAfterApproving.push({
              department: location.department,
              location: location.location,
              actualbudget: result.budget,
              budget: remain
            });
          }, err => {
            console.log(err);
          });
        //  }, err => {
        //    console.log(err);
        //  });
          this.multiLocs.push(location);
      }
    }, err => {
      console.log(err);
    });
    this.locationService.getUniqueLocation(this.sub).subscribe(data => {
      for (let i of data) {
        this.locationService.getLocationBudget(i.location).subscribe(data => {
          this.locationService.getLocationSpent(i.location).subscribe(result => {
            data[0].total_spent = result[0].total_spent;
            this.locationBudget.push(data[0]);
            console.log(this.locationBudget);
          }, err => {
            console.log(err);
          });
        }, err => {
          console.log(err);
        });
      }
    });
    // console.log('Temp', temparray);
    console.log('BudgetArray', this.budget);
    console.log('BudgetAfterApproving', this.budgetAfterApproving);
    console.log(this.sub);
    this.order.order_id = this.sub;
  }

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

  getLocation(order_id: any) {
    this.locationService.getLocationById(order_id).subscribe((data) => {
      this.locationList = data;
      console.log('location data-', data);
      for (const location of this.locationList) {
        this.multiLocs.push(location);
      }
    });

  }

  getItem(order_id: any) {
    this.itemService.getItemById(order_id).subscribe((data) => {
      this.itemList = data;
      console.log("item data-",data);
      for (const item of this.itemList) {
        this.finalItem.push(item);
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

locValue(loc, dept) {
  this.multiLocs.push({
    location: loc,
    department: dept,
    });
  console.log(this.multiLocs);
  this.change = !true;
}

removeLoc(loc, i: number) {
  loc.order_id = this.sub;
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
  this.logValue();
  this.finalItem.push(item);
  this.toggleSelected = !true;
}

toggleDisplay(product: string) {
  this.isShow = false;
  console.log('product name', product);
  this.selectedCatalog = this.catalog.filter(item => item.name === product);
  console.log('products-', this.selectedCatalog);
}

orderItem(product: any) {
  console.log('product- ', product);
  this.finalItem.push(product);
  this.toggleSelected = !true;
}

removeOrderItem(item, i: number) {
  item.order_id = this.sub;
  this.finalItem.splice(i, 1);
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

orderDecision(status, decision, refresher) {
  let lowBudget = '';
  for (let i of this.multiLocs) {
    const cost = this.budgetAfterApproving.find(l => l.location === i.location && l.department === i.department).budget;
    if (cost < i.total_price && status === 'Approved') {
      this.snackBar.open('Required Budget is not available', '', {duration: 2000});
      lowBudget = i.location;
      break;
    }
  }
  if ( status === 'Denied') {
    for ( let i of this.multiLocs) {
      const locIndex = this.budgetAfterApproving.findIndex(e => e.location === i.location && e.department === i.department);
      this.budgetAfterApproving[locIndex].budget = this.budgetAfterApproving[locIndex].budget + i.total_price;
    }
  }
  if ((status === 'Approved' && lowBudget === '') || status === 'Denied') {
    this.order.status = status;
    console.log('Status needs to update', this.order.status);
    this.order.message = decision;
    console.log('Message', this.order.message);
    console.log('Order_id', this.order.order_id);
    let updateData = {
      status: this.order.status,
      message: this.order.message,
      order_id: this.order.order_id
    };
    this.http.put(environment.BASE_URL + 'orders/updateStatus', updateData).subscribe(data => {
      console.log(data);
      for (let i of this.budgetAfterApproving) {
        this.budgetService.updateBudget(i.department, i.location, i.budget).subscribe(result => {
          console.log(result);
        }, err => {
          console.log(err);
        });
      }
      this.router.navigate(['/request']);
    }, err => {
      console.log(err);
    });
   }
  }

    doRefresh(refresher) {
      console.log('Begin async operation', refresher);

      setTimeout(() => {
        console.log('Async operation has ended');
        this.ngOnInit();
        refresher.target.complete();
      }, 2000);
    }
}

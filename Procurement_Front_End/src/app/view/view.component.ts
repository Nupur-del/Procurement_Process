import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {LoginService} from '../login.service';
import {MatSnackBar} from '@angular/material';
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
  openPartial = true;
  toggleSelected = true;
  option: string;
  interval: any;
  order: any = {};
  requestorDetails = [];
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
  selectLocDept = false;
  partialApproved = false;
  userID: number;
  public catalog: any[] = [];
  name: string;
  locDetails = [];
  deptDetails = [];
  statusDetatils = [];
  supplierDetails = [{
    name: '',
    id: null
  }];
  brandDetails = [{
    brandName: '',
    brandpk: null
  }];
  department: string;
  date: Date;
  order_desc: string;

  constructor(private router: Router,
              public snackBar: MatSnackBar,
              private http: HttpClient,
              private login: LoginService,
              private data: DataService,
              private budgetService: BudgetService,
              private orderService: OrderService,
              private locationService: LocationService,
              private itemService: ItemService) { }


  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.sub = message);
    this.userID = +localStorage.getItem('userId');

    this.http.get(environment.BASE_URL + 'cities/locationDetails')
    .subscribe((loc: any) => {
      this.locDetails = loc;
      this.http.get(environment.BASE_URL + 'department/deptDetails')
      .subscribe((dept: any) => {
        this.deptDetails = dept;
        this.login.getSupplier().subscribe(data => {
          this.supplierDetails = data;
          this.http.get<any>(environment.BASE_URL + 'brand/brandName').subscribe(brandDetails => {
          this.itemService.getItemById(this.sub).subscribe(pro => {
            this.itemList = pro;
            console.log('item data', pro);
            for (const item of this.itemList) {
              this.finalItem.push({
                name: item.name,
                specification: item.specification,
                prefered_vendor: item.prefered_vendor,
                quantity: item.quantity,
                unit_type: item.unit_type,
                locationName: this.locDetails.find(e => e.locLocationPK === item.location).locName,
                departmentName: this.deptDetails.find(s => s.id === item.department).department_name,
                supplierName: this.supplierDetails.find(a => a.id === item.prefered_vendor).name,
                location: item.location,
                department: item.department,
                price: item.price,
                currency: item.currency,
                comment: item.comment,
                brand: item.brand,
                brandName: brandDetails.find(f => f.brandpk === item.brand).brandName
              });
            }
          });
        });
       });
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });

    this.http.get(environment.BASE_URL + 'order/getStatus')
    .subscribe((data: any) => {
      this.statusDetatils = data;
    }, err => {
      console.log(err);
    });

    this.login.getUser('Requestor').subscribe(user => {
      this.requestorDetails = user;
      this.orderService.getOrderById(this.sub).subscribe((data: any) => {
        this.order = data[0];
        this.order.creator = this.requestorDetails.find(a => a.id === this.order.created_by).name;
      });
    }, err => {
      console.log(err);
    });

    let temparray: any = [];
    this.locationService.getLocationById(this.sub).subscribe((data) => {
      this.locationList = data;
      console.log('location data', data);
      for (let location of this.locationList) {
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
          this.multiLocs.push(location);
      }
    }, err => {
      console.log(err);
    });

    // this.locationService.getUniqueLocation(this.sub).subscribe(data => {
    //   for (let i of data) {
    //     this.locationService.getLocationBudget(i.location).subscribe(data => {
    //       this.locationService.getLocationSpent(i.location).subscribe(result => {
    //         data[0].total_spent = result[0].total_spent;
    //         this.locationBudget.push(data[0]);
    //         console.log(this.locationBudget);
    //       }, err => {
    //         console.log(err);
    //       });
    //     }, err => {
    //       console.log(err);
    //     });
    //   }
    // });
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
  if (status === 'Partial Approved') {
    this.selectLocDept = true;
    this.partialApproved = true;
    this.openPartial = false;
  }

  for (let i of this.multiLocs) {
    const cost = this.budgetAfterApproving.find(l => l.location === i.location && l.department === i.department).actualbudget;
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
    this.order.status = this.statusDetatils.find(e => e.orderStatus === status).id;
    console.log('Status needs to update', this.order.status);
    this.order.message = decision;
    this.order.approver = this.userID;
    console.log('Message', this.order.message);
    console.log('Order_id', this.order.order_id);
    let updateData = {
      status: this.order.status,
      approver: this.order.approver,
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

  partialdecision(form: NgForm) {
    let updateData = [];
    const result = this.budgetAfterApproving.find(e => e.location === form.value.loc.location
      && e.department === form.value.loc.department);
    if (result.budget < 0) {
      this.snackBar.open('Wrong location and department got selected please check once again', '', {duration: 2000});
    } else {
      console.log(this.budgetAfterApproving);
      for (let i of this.budgetAfterApproving) {
        if (i.location === form.value.loc.location && i.department === form.value.loc.department) {
          updateData.push({
            order_id: this.order.order_id,
            location: this.locDetails.find(q => q.locName === i.location).locLocationPK,
            department: this.deptDetails.find(d => d.department_name === i.department).id,
            orderStatus: 3,
            itemStatus: 4,
            message: form.value.decision,
            approved_by: this.userID
          });
        } else {
          updateData.push({
            order_id: this.order.order_id,
            location: this.locDetails.find(q => q.locName === i.location).locLocationPK,
            department: this.deptDetails.find(d => d.department_name === i.department).id,
            orderStatus: 3,
            itemStatus: 2,
            message: form.value.decision,
            approved_by: this.userID
          });
        }
      }
      console.log(updateData);
      this.http.put(environment.BASE_URL + 'orders/partialUpdate', updateData).subscribe(data => {
        if (data) {
         this.router.navigate(['/request']);
        }
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

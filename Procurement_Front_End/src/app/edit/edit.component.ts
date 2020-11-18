import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {ImageService} from '../../../projects/Supplier/src/app/image.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from '../data.service';
import { Observable, Subscription } from 'rxjs';
import { startWith, map} from 'rxjs/operators';
import {FormControl, Validators, NgForm} from '@angular/forms';
import { OrderService } from '../order.service';
import { LocationService } from '../location.service';
import { environment } from '../../environments/environment';
import { ItemService } from '../item.service';
import { ItemService as supplierItemService } from '../../../projects/Supplier/src/app/item.service';
import { BudgetService } from '../budget.service';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatDialog,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { isNumber } from 'util';

interface ImageSlider {
  image: string;
  thumbImage: string;
  alt: string;
  title: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit, OnDestroy {

  // State Management

  availableChoices = ['None',
  'Filter by Supplier Names',
  'Filter by Brand Names',
  'Filter by Product Names'];
  isShow = true;
  isLoading = false;
  new = true;
  catalogDisplay = true;
  change = true;
  toggleSelected = true;
  action = true;
  setAutoHide = true;
  addExtraClass = false;
  isImages = true;
  selectItem = false;

  // Observables

  filteredOptions: Observable<string[]>;
  filteredOptionSupplier: Observable<string[]>;
  filteredOptionBrand: Observable<string[]>;

  // Arrays

  public orderList: any = [ ];
  public locationList: any = [ ];
  public itemList: any = [ ];
  public multiLocs: any = [ ];
  public budget: any = [ ];
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
  public catalog: any[] = [];
  itemProducts: string[] = [];
  supplierNames: string[] = [];
  brandNames: string[] = [];
  itemImages: Array<ImageSlider>;
  cities: string[] = [];
  departments: string[] = [];

  // Variables

  sub: any;
  selectedOption = '';
  closeResult: string;
  option: string;
  name: string;
  department: string;
  public itemValue = 0;
  public lowBudgetDept = '';
  date: Date;
  order_desc: string;
  message: string;
  actionButtonLabel = ':)';
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  // Subscription

  orderSub: Subscription;
  itemSub: Subscription;
  locationSub: Subscription;
  statusSub: Subscription;
  updateOrderSub: Subscription;
  citySub: Subscription;
  deptSub: Subscription;
  imageSub: Subscription;

  // FormControl

  myControl = new FormControl();
  supplierControl = new FormControl();
  BrandControl = new FormControl();
  quant = new FormControl('', Validators.min(1));
  @ViewChild('catalogForm', {static: false}) catalogForm: NgForm;
  price = new FormControl('', Validators.min(1));

  // Objects

  order: any = {};

  constructor(private router: Router,
              private http: HttpClient,
              private data: DataService,
              public snackBar: MatSnackBar,
              private imageService: ImageService,
              private orderService: OrderService,
              private sItem: supplierItemService,
              private locationService: LocationService,
              private itemService: ItemService,
              private budgetService: BudgetService,
              public dialog: MatDialog) { }


  ngOnInit() {

    this.data.currentMessage.subscribe(message => this.sub = message);

    this.orderSub = this.orderService.getOrderById(this.sub).subscribe((data: any) => {
      this.order = data[0];
      console.log('Order',this.order);
    });

    this.statusSub = this.orderService.getStatusById(this.sub).subscribe((data: any) => {
      this.order.status = data.status;
      this.order.message = data.message;
      console.log('status', this.order);
    });

    this.locationSub = this.locationService.getLocationById(this.sub).subscribe((data) => {
      this.locationList = data;
      console.log('location data-', data);
      for (const location of this.locationList) {
        this.multiLocs.push(location);
        console.log('Location with itemValue', this.multiLocs);
        this.budgetService.getBudgetByDept(location.department, location.location).subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {
          this.budget.push(data);
          console.log('Dept Budget-', this.budget);
        });
      }
    });

    this.itemSub = this.itemService.getItemById(this.sub).subscribe((data) => {
      this.itemList = data;
      console.log('item data-', data);
      for (const item of this.itemList) {
        this.finalItem.push(item);
        // this.itemValue = this.itemValue + ((+item.quantity) * (+item.price));
        // console.log('Item price-', this.itemValue);
        console.log('Existing Item', this.finalItem);
      }
    });
    this.order.order_id = this.sub;

    this.deptSub = this.http.get(environment.BASE_URL + 'department/fetchDepartmentName')
    .subscribe((data: Array<string>) => {
      this.departments = data;
      console.log(data);
      console.log('Dept', this.departments);
    }, err => {
      console.log(err);
      alert(err);
    });

    this.citySub = this.http.get(environment.BASE_URL + 'cities/citiesName')
    .subscribe((data: Array<string>) => {
      this.cities = data;
      console.log(data);
      console.log(this.cities);
    }, err => {
      console.log(err);
      alert(err);
    });

    this.itemSub = this.sItem.getAllItems().subscribe((data: any[]) => {
      for (let i of data) {
      this.catalog.push(i);
      if (this.itemProducts.includes(i.name) === false) {
        this.itemProducts.push(i.name);
      }
      if (this.supplierNames.includes(i.supplier) === false) {
        this.supplierNames.push(i.supplier);
      }
      if (this.brandNames.includes(i.brand) === false) {
        this.brandNames.push(i.brand);
      }
    }
  });

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(this.itemProducts, value))
    );
    this.filteredOptionSupplier = this.supplierControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(this.supplierNames, value))
    );
    this.filteredOptionBrand = this.BrandControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(this.brandNames, value))
    );

  }

  private _filter(feature: string[], value: string): string[] {
    const filterValue = value.toLowerCase();
    return feature.filter(option => option.toLowerCase().includes(filterValue));
  }

  // tslint:disable-next-line: variable-name
  getOrder(order_id: any) {
    this.orderSub = this.orderService.getOrderById(order_id).subscribe( data => {
      this.orderList = data;
      console.log('order data-', this.orderList);
      this.order.created_by = this.orderList.created_by;
      this.order.date = this.orderList.date;
      this.order.order_desc = this.orderList.order_desc;
      this.order.status = 'pending';
      this.order.message = 'Request submitted for review';
    });
  }

  selectedChoice(option: string) {
    this.selectedOption = option;
    console.log(option);
  }

  // tslint:disable-next-line: variable-name
  getLocation(order_id: any) {
    this.locationSub = this.locationService.getLocationById(order_id).subscribe((data) => {
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
    this.itemSub = this.itemService.getItemById(order_id).subscribe((data) => {
      this.itemList = data;
      console.log('item data-', data);
      for (const item of this.itemList) {
        this.finalItem.push(item);
        this.itemValue = this.itemValue + ((+item.quantity) * (+item.price));
        console.log('Item price-', this.itemValue);
      }
    });
  }

  removeItems(i: number) {
    this.items.splice(i, 1);
  }

  checkImages(item_id: number) {
    this.isLoading = true;
    this.itemImages = [{
      image: 'http://localhost:3000/images/dummy_image.jpg',
      thumbImage: 'http://localhost:3000/images/dummy_image.jpg',
      alt: 'dummy',
      title: 'Appliances'
    }];
    this.imageSub = this.imageService.getImageById(item_id).subscribe((data: Array<any>) => {
      console.log(data);
      if (data.length > 0) {
      this.isImages = false;
      for (let i of data) {
      this.itemImages.push({
        image: 'http://localhost:3000/images/' + i.imageName,
        thumbImage: 'http://localhost:3000/images/' + i.imageName,
        alt: 'alt of image',
        title: 'USB CABLE'
      });
      this.isLoading = false;
      }
   } else {
     this.isImages = true;
     this.snackBar.open('No Images are available for this Product', '', {duration: 2000});
     this.isLoading = false;
   }
      console.log(this.itemImages);
    });
  }

  logValue() {
    console.log(this.items);
  }
  // tslint:disable-next-line: variable-name
  locValue(order_id, loc, dept) {
        const budgetIndex = this.budget.findIndex(exist => exist.location === loc && exist.department === dept);
        if (budgetIndex < 0) {
        this.budgetService.getBudgetByDept(dept, loc).subscribe((data: any) => {
          console.log(data);
          this.budget.push(data);
          console.log('Dept Budget-', this.budget);
          if (data.current_balance > 0) {
            this.snackBar.open('Required budget is available', '' , {duration : 2000});
            this.change = !true;
            this.selectItem = true;
          } else {
            this.snackBar.open('Required budget is not available', '' , {duration : 2000});
          }
        }, err => {
          alert(err);
        });
      } else {
        if (this.budget[budgetIndex].current_balance > 0) {
            this.snackBar.open('Required budget is available', '' , {duration : 2000});
            this.change = !true;
            this.selectItem = true;
          } else {
            this.snackBar.open('Required budget is not available', '' , {duration : 2000});
          }
      }
  }

  removeLoc(i: number) {
    this.budget.splice(i, 1);
    console.log('Dept Budget-', this.budget);
    this.lowBudgetDept = '';
    this.multiLocs.splice(i, 1);
  }

  addfinalItem(form: NgForm) {
    this.lowBudgetDept = '';
    this.itemValue = 0;
    const addedDepartment = this.multiLocs.findIndex(city => city.location === form.value.location &&
       city.department === form.value.dept);
    if (addedDepartment >= 0) {
      this.itemValue = +this.multiLocs[addedDepartment].total_price +
      ((+this.quant.value) * (+this.price.value));
    } else {
      this.itemValue = this.itemValue + ((+this.quant.value) * (+this.price.value));
    }

    const b = this.budget.find(exist => exist.location === form.value.location
                                && exist.department === form.value.dept);
    if (!b) {
          this.snackBar.open('Please check the budget availability first', '', {duration: this.autoHide});
    } else {
    if (this.itemValue > +b.current_balance) {
        this.lowBudgetDept = b.department;
        this.itemValue = this.itemValue - ((+this.quant.value) * (+this.price.value));
        console.log('Item price- after', this.itemValue);
    }
    if (addedDepartment >= 0) {
      this.multiLocs[addedDepartment].total_price = this.itemValue;
    } else {
      this.multiLocs.push({
        order_id: this.order.order_id,
        location: form.value.location,
        department: form.value.dept,
        total_price: this.itemValue
      });
    }
    if (this.lowBudgetDept === '') {
      const addedItemIndex = this.finalItem.findIndex(item =>
        item.location === form.value.location
            && item.department === form.value.dept &&
            item.name === this.myControl.value &&
            item.supplier === this.supplierControl.value
            && item.prefered_vendor === this.BrandControl.value
            && item.price === this.price.value
            && item.specification === form.value.specification
      );
      console.log(this.finalItem);
      console.log('addedItem', addedItemIndex);
      if (addedItemIndex >= 0) {
        this.snackBar.open('Selected item has already added to selected location and department', '', {duration: this.autoHide});
        this.finalItem[addedItemIndex].quantity =  +this.finalItem[addedItemIndex].quantity + +this.quant.value;
      } else {
    this.finalItem.push({
      name: this.myControl.value,
      specification: form.value.specification,
      prefered_vendor: this.BrandControl.value,
      quantity: this.quant.value,
      location: form.value.location,
      department: form.value.dept,
      unit_type: form.value.unit,
      price: this.price.value,
      currency: form.value.currency,
      custom: form.value.type,
      comment: form.value.comment,
      supplier: this.supplierControl.value
      });
    }
      console.log('FinalItem', this.finalItem);
      console.log('MultiLocs', this.multiLocs);
      this.toggleSelected = !true;
    } else {
      console.log('low budget dept- ', this.lowBudgetDept);
      this.openDialog();
      }
    }
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

  toggleSupplier(supplier: string) {
    this.isShow = false;
    console.log('Supplier Name', supplier);
    this.selectedCatalog = this.catalog.filter(item => item.supplier === supplier);
    console.log('Supplier Data', this.selectedCatalog);
   }

   toggleBrand(brand: string) {
     this.isShow = false;
     console.log('Brand Name', brand);
     this.selectedCatalog = this.catalog.filter(item => item.brand === brand);
     console.log('Brand Data', this.selectedCatalog);
   }

  orderItem(product: any, loc: string, dept: string) {
    this.lowBudgetDept = '';
    this.itemValue = 0;
    const addedDepartment = this.multiLocs.findIndex(city => city.location === loc &&
                                                     city.department === dept);
    if (addedDepartment >= 0) {
     this.itemValue = +this.multiLocs[addedDepartment].total_price + ((+product.quantity) * (+product.price));
   } else {
     this.itemValue = this.itemValue + ((+product.quantity) * (+product.price));
   }

    const budget = this.budget.find(exist => exist.location === loc
                               && exist.department === dept);
    if (!budget) {
        this.snackBar.open('Please check the budget availability first', '', {duration: this.autoHide});
    } else {
    // tslint:disable-next-line: prefer-const
    if (this.itemValue > budget.current_balance) {
        this.lowBudgetDept = budget.department;
        this.itemValue = this.itemValue - ((+product.quantity) * (+product.price));
        console.log('Item price- after minus', this.itemValue);
    }
    if (addedDepartment >= 0) {
      this.multiLocs[addedDepartment].total_price = this.itemValue;
    } else {
      this.multiLocs.push({
        order_id: this.order.order_id,
        location: loc,
        department: dept,
        total_price: this.itemValue
      });
    }
    console.log('MultiLocs', this.multiLocs);
    if (this.lowBudgetDept === '') {
      if (product.quantity <= 0) {
        this.snackBar.open('Quantity cannot be less than 1', '', {duration: this.autoHide});
        } else {
      const addedItemIndex = this.finalItem.findIndex(item =>
        item.location === loc
            && item.department === dept &&
            item.name === product.name &&
            item.supplier === product.supplier
            && item.prefered_vendor === product.brand
            && item.price === product.price
      );
      if (addedItemIndex >= 0) {
        this.snackBar.open('Selected item has already added to selected location and department', '', {duration: this.autoHide});
        this.finalItem[addedItemIndex].quantity =  +this.finalItem[addedItemIndex].quantity + +product.quantity;
      } else {
      this.finalItem.push({
        name: product.name,
        specification: product.specification,
        prefered_vendor: product.brand,
        quantity: product.quantity,
        location: loc,
        department: dept,
        unit_type: product.unit_type,
        price: product.price,
        currency: product.currency,
        custom: product.type,
        comment: product.comment,
        supplier: product.supplier
        });
      }
    }
      this.toggleSelected = !true;
      } else {
      console.log('low budget dept- ', this.lowBudgetDept);
      this.openDialog();
    }
   }
  }

  otherlocation() {
    this.selectedOption = null;
    this.isImages = true;
    this.change = true;
    this.new = true;
    this.selectItem = false;
    this.isShow = true;
    this.catalogDisplay = true;
    this.catalogForm.resetForm();
  }

  removeOrderItem(i: number, item: any) {
    const lexist = this.finalItem.filter(loc => loc.location === this.finalItem[i].location &&
                                         loc.department === this.finalItem[i].department);
    if (lexist.length === 1) {
      this.multiLocs = this.multiLocs.filter(loc => loc.location !== this.finalItem[i].location &&
                                             loc.department !== this.finalItem[i].department);
    }
    this.finalItem.splice(i, 1);
    this.lowBudgetDept = '';
    this.itemValue = this.itemValue - ((+item.quantity) * (+item.price));
    const locExist = this.multiLocs.findIndex(exist => exist.location === item.location
                                              && exist.department === item.department);
    if (locExist >= 0) {
      this.multiLocs[locExist].total_price = this.itemValue;
    }
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
    this.order.color = 'primary';
    if (this.finalItem.length <= 0 || this.multiLocs.length <= 0) {
      this.snackBar.open('No item is available in request', '', {duration: this.autoHide});
    } else {
    let deleteParams = new HttpParams().set('order_id', this.order.order_id);
    this.updateOrderSub = this.http.delete(environment.BASE_URL + 'order/removeOrder', {params: deleteParams})
      .subscribe(
        data => {
           console.log(data);
           console.log('Update Order',this.order);
           this.orderSub = this.orderService.editOrder(this.order).subscribe(data => {
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

  ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
    if (this.updateOrderSub) {
      this.updateOrderSub.unsubscribe();
    }
    if (this.itemSub) {
      this.itemSub.unsubscribe();
    }
    if (this.locationSub) {
      this.locationSub.unsubscribe();
    }
    if (this.statusSub) {
      this.statusSub.unsubscribe();
    }
    if (this.citySub) {
      this.citySub.unsubscribe();
    }
    if (this.deptSub) {
      this.deptSub.unsubscribe();
    }
    if (this.imageSub) {
      this.imageSub.unsubscribe();
    }
  }

}

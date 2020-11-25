import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {ImageService} from '../../../projects/Supplier/src/app/image.service';
import {Subscription, Observable} from 'rxjs';
import { LocationService } from '../location.service';
import {map, startWith} from 'rxjs/operators';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../../../projects/Supplier/src/app/item.service';
import { BudgetService } from '../budget.service';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import {
  MatSnackBar,
  MatDialog,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

interface ImageSlider {
  image: string;
  thumbImage: string;
  alt: string;
  title: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})

export class AdminComponent implements OnInit, OnDestroy {

  // State Management

  isNext = false;
  isImages = true;
  isShow = true;
  selectItem = false;
  new = true;
  isLoading = false;
  selectedOption = '';
  availableChoices = ['None',
  'Filter by Supplier Names',
  'Filter by Brand Names',
  'Filter by Product Names'];
  catalogDisplay = true;
  change = true;
  toggleSelected = true;
  locAdded = false;

  // FormControl

  @ViewChild('catalogForm', {static: false}) catalogForm: NgForm;
  myControl = new FormControl('');
  supplierControl = new FormControl('');
  BrandControl = new FormControl('');
  quant = new FormControl('', Validators.min(1));
  price = new FormControl('', Validators.min(1));

  // Variables

  closeResult: string;
  option: string;
  name: string;
  department: string;
  date: Date;
  order_desc: string;
  message = 'Item Added Successfully!';
  actionButtonLabel = ':)';
  created_by: string;
  public itemValue  = 0;
  public lowBudgetDept = '';
  public lowBudget = 0;

  // Objects

  imgObj: any = {};
  order: any = {};
  location: any = {};

  // Arrays

  cities: string[];
  departments: string[];
  itemImages: Array<ImageSlider>;
  budgetAfterApproving: any[] = [];
  public multiLocs: any = [ ];
  public budget: any = [ ];
  public finalItem: any[] = [];
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
    comment: '',
    supplier: ''
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

// Observables

  filteredOptionBrand: Observable<string[]>;
  filteredOptions: Observable<string[]>;
  filteredOptionSupplier: Observable<string[]>;

  // SnackBar

  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  // Subscriptions

  citiesSub: Subscription;
  departSub: Subscription;
  itemSub: Subscription;
  orderSub: Subscription;
  addOrderSub: Subscription;
  imageSub: Subscription;

  constructor(public snackBar: MatSnackBar,
              private modalService: NgbModal,
              public http: HttpClient,
              public router: Router,
              private locationService: LocationService,
              private imageService: ImageService,
              private itemService: ItemService,
              private budgetService: BudgetService,
              public dialog: MatDialog) {
              }

  ngOnInit() {
    this.created_by = localStorage.getItem('username');
    this.citiesSub = this.http.get(environment.BASE_URL + 'department/fetchDepartmentName')
    .subscribe((data: Array<string>) => {
      this.departments = data;
    }, err => {
      console.log(err);
      alert(err);
    }
    );
    this.departSub = this.http.get(environment.BASE_URL + 'cities/citiesName')
    .subscribe((data: Array<string>) => {
      this.cities = data;
    }, err => {
      console.log(err);
      alert(err);
    });

    this.itemSub = this.itemService.getAllItems().subscribe((data: any[]) => {
        for (const i of data) {
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
    this.autocomplete();
  }

  autocomplete() {
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
    if (value) {
      const filterValue = value.toLowerCase();
      return feature.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  removeItems(i: number) {
    this.items.splice(i, 1);
  }

  logValue() {
    console.log(this.items);
  }

  // locValue(loc, dept, quant, price) {
  //   let tempBudgetDept = '';
  //   this.itemValue = 0;
  //   const addedDepartment = this.multiLocs.findIndex(city => city.location === loc && city.department === dept);
  //   if (addedDepartment >= 0) {
  //     this.itemValue = +this.multiLocs[addedDepartment].total_price + ((+quant) * (+price));
  //     console.log('Item price-', this.itemValue);
  //   } else {
  //     this.itemValue = this.itemValue + ((+quant) * (+price));
  //     console.log('Item price-', this.itemValue);
  //   }
  //   console.log('Value', this.itemValue);
  //   const budgetIndex = this.budgetAfterApproving.findIndex(exist => exist.location === loc &&
  //     exist.department === dept);

  //   if (budgetIndex < 0) {
  //     this.locationService.getSpentLocDept(loc, dept).subscribe(spent => {
  //       let exp = spent[0].total_spent === null ? spent[0].total_spent : 0;
  //       console.log(exp);
  //       this.budgetService.getBudgetByDept(dept, loc).subscribe((result: any) => {
  //         this.budgetAfterApproving.push({
  //           department: dept,
  //           location: loc,
  //           budget: (+result.current_balance - +exp)
  //         });
  //         console.log(this.budgetAfterApproving);
  //         const i = this.budgetAfterApproving.findIndex(exist => exist.location === loc &&
  //           exist.department === dept);
  //         console.log(this.budgetAfterApproving[i].budget);
  //         console.log('Type of budget', typeof(this.budgetAfterApproving[i].budget));
  //         if (this.itemValue > +this.budgetAfterApproving[i].budget) {
  //               tempBudgetDept = dept;
  //               this.lowBudget = this.budgetAfterApproving[i].budget - this.itemValue;
  //               console.log(tempBudgetDept);
  //               this.itemValue = this.itemValue - ((+quant) * (+price));
  //               console.log('Item price-', this.itemValue);
  //         } else {
  //           tempBudgetDept = 'none';
  //           console.log(tempBudgetDept);
  //         }
  //       }, err => {
  //         console.log(err);
  //       });
  //     }, err => {
  //       console.log(err);
  //     });
  //   } else {
  //     console.log('non', this.budgetAfterApproving[budgetIndex].budget);
  //     console.log(this.itemValue > this.budgetAfterApproving[budgetIndex].budget);
  //     if (this.itemValue > this.budgetAfterApproving[budgetIndex].budget) {
  //       console.log(this.itemValue);
  //       tempBudgetDept = this.budgetAfterApproving[budgetIndex].department;
  //       this.lowBudget = this.budgetAfterApproving[budgetIndex].budget - this.itemValue;
  //       this.itemValue = this.itemValue - ((+quant) * (+price));
  //       console.log('Item price-', this.itemValue);
  //     } else {
  //     tempBudgetDept = 'none';
  //     console.log(tempBudgetDept);
  //     }
  //   }
  //   return tempBudgetDept;
  // }

  removeLoc(i: number) {
    this.budget.splice(i, 1);
    console.log('Dept Budget-', this.budget);
    this.lowBudgetDept = '';
    this.multiLocs.splice(i, 1);
    this.locAdded = false;
  }

  removeCatItems(i: number) {
    this.catalogItems.splice(i, 1);
  }

  logCatValue() {
    console.log(this.catalogItems);
  }

  // For adding items from new

  addfinalItem(form: NgForm) {
      console.log('Form', form);
      if (!form.value.location || !form.value.dept) {
            this.snackBar.open('Please select the Location and Department', '', {duration: this.autoHide});
      } else {
            this.itemValue = 0;
            this.lowBudgetDept = '';
            const itemAdd = {
                  name: this.myControl.value,
                  specification: form.value.specification,
                  prefered_vendor: this.BrandControl.value,
                  quantity: this.quant.value,
                  unit_type: form.value.unit,
                  location: form.value.location,
                  department: form.value.dept,
                  price: this.price.value,
                  currency: form.value.currency,
                  comment: form.value.comment,
                  supplier: this.supplierControl.value
            };
            const addedDepartment = this.multiLocs.findIndex(city => city.location === form.value.location &&
                                    city.department === form.value.dept);
            const addedItemIndex = this.finalItem.findIndex(item =>
                item.location === form.value.location
                && item.department === form.value.dept &&
                item.name === this.myControl.value &&
                item.supplier === this.supplierControl.value
                && item.prefered_vendor === this.BrandControl.value
                && item.price === this.price.value
                && item.specification === form.value.specification
            );
            if (addedDepartment >= 0) {
                this.itemValue = +this.multiLocs[addedDepartment].total_price + ((+this.quant.value) * (+this.price.value));
                console.log('Item Price', this.itemValue);
            } else {
                this.itemValue = this.itemValue + ((+this.quant.value) * (+this.price.value));
                console.log('Item price-', this.itemValue);
            }
            console.log('ItemValue', this.itemValue);
            const budgetIndex = this.budgetAfterApproving.findIndex(exist =>
                                exist.location === form.value.location && exist.department === form.value.dept);

            if (budgetIndex < 0) {
                  this.locationService.getSpentLocDept(form.value.location, form.value.dept).subscribe(spent => {
                      const exp = spent[0].total_spent === null ? 0 : spent[0].total_spent;
                      console.log(exp);
                      this.budgetService.getBudgetByDept(form.value.dept, form.value.location).subscribe((result: any) => {
                          this.budgetAfterApproving.push({
                                department: form.value.dept,
                                location: form.value.location,
                                budget: (+result.current_balance - +exp)
                          });
                          console.log(this.budgetAfterApproving);
                          const i = this.budgetAfterApproving.findIndex(exist =>
                                    exist.location === form.value.location && exist.department === form.value.dept);
                          if (this.itemValue > +this.budgetAfterApproving[i].budget) {
                              this.lowBudgetDept = form.value.dept;
                              this.lowBudget = this.budgetAfterApproving[i].budget - this.itemValue;
                              this.itemValue = this.itemValue - ((+this.quant.value) * (+this.price.value));
                              console.log('Item price-', this.itemValue);
                              console.log('low budget dept- ', this.lowBudgetDept);
                              this.openDialog();
                          } else {
                              this.additionItem(itemAdd, addedDepartment, addedItemIndex, this.itemValue);
                              this.myControl.reset();
                              this.supplierControl.reset();
                              this.BrandControl.reset();
                              this.quant.reset();
                              this.price.reset();
                              this.catalogForm.form.controls.comment.reset();
                              this.catalogForm.form.controls.currency.reset();
                              this.catalogForm.form.controls.unit.reset();
                              this.catalogForm.form.controls.specification.reset();
                              this.autocomplete();
                          }
                      }, err => {
                          console.log(err);
                      });
                  }, err => {
                      console.log(err);
                  });
            } else {
                console.log('non', this.budgetAfterApproving[budgetIndex].budget);
                console.log(this.itemValue > this.budgetAfterApproving[budgetIndex].budget);
                if (this.itemValue > this.budgetAfterApproving[budgetIndex].budget) {
                    this.lowBudgetDept = this.budgetAfterApproving[budgetIndex].department;
                    this.lowBudget = this.budgetAfterApproving[budgetIndex].budget - this.itemValue;
                    this.itemValue = this.itemValue - ((+this.quant.value) * (+this.price.value));
                    console.log('Item price-', this.itemValue);
                    console.log('low budget dept- ', this.lowBudgetDept);
                    this.openDialog();
                } else {
                    this.additionItem(itemAdd, addedDepartment, addedItemIndex, this.itemValue);
                    this.myControl.reset();
                    this.supplierControl.reset();
                    this.BrandControl.reset();
                    this.quant.reset();
                    this.price.reset();
                    this.catalogForm.form.controls.comment.reset();
                    this.catalogForm.form.controls.currency.reset();
                    this.catalogForm.form.controls.unit.reset();
                    this.catalogForm.form.controls.specification.reset();
                    this.autocomplete();
                }
            }
    }
 }

additionItem(item, multiLocsIndex, itemIndex, cost) {
  if (item.quantity <= 0) {
            this.snackBar.open('Quantity cannot be less than 1', '', {duration: this.autoHide});
      } else {
          if (multiLocsIndex >= 0) {
                this.multiLocs[multiLocsIndex].total_price = cost;
                console.log(this.multiLocs);
            } else {
              this.multiLocs.push({
                  location: item.location,
                  department: item.department,
                  total_price: cost
            });
              console.log(this.multiLocs);
          }
          console.log('addedItem', itemIndex);
          if (itemIndex >= 0) {
                this.snackBar.open('Selected item has already added to selected location and department', '', {duration: this.autoHide});
                this.finalItem[itemIndex].quantity =  +this.finalItem[itemIndex].quantity + +item.quantity;
          } else {
                this.finalItem.push({
                    name: item.name,
                    specification: item.specification,
                    prefered_vendor: item.prefered_vendor,
                    quantity: item.quantity,
                    unit_type: item.unit_type,
                    location: item.location,
                    department: item.department,
                    price: item.price,
                    currency: item.currency,
                    comment: item.comment,
                    supplier: item.supplier
                  });
          }
    }
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

  // For filtering the data of catalog Display

  toggleDisplay(product: string) {
    this.isShow = false;
    console.log('product name', product);
    this.selectedCatalog = this.catalog.filter(item => item.name === product);
    console.log('products-', this.selectedCatalog);
  }

  selectedChoice(option: string) {
    this.selectedOption = option;
    console.log(option);
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

  // For checking the images of items available

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
      for (const i of data) {
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

  // For adding item from catalog

  orderItem(product: any, loc: string, dept: string) {
    if (!loc || !dept) {
          this.snackBar.open('Please select the Location and Department', '', {duration: this.autoHide});
    } else {
        this.lowBudgetDept = '';
        this.itemValue = 0;
        const itemAdd = {
          name: product.name,
          department: dept,
          location: loc,
          specification: product.specification,
          prefered_vendor: product.brand,
          quantity: product.quantity,
          unit_type: product.unit_type,
          price: product.price,
          currency: product.currency,
          comment: product.comment,
          supplier: product.supplier
       };
        const addedDepartment = this.multiLocs.findIndex(city => city.location === loc && city.department === dept);
        const addedItemIndex = this.finalItem.findIndex(item =>
                                              item.location === loc
                                                && item.department === dept &&
                                                item.name === product.name &&
                                                item.supplier === product.supplier
                                                && item.prefered_vendor === product.brand
                                                && item.price === product.price
                                                && item.specification === product.specification
                                              );
        if (addedDepartment >= 0) {
              this.itemValue = +this.multiLocs[addedDepartment].total_price + ((+product.quantity) * (+product.price));
              console.log('Item Price', this.itemValue);
        } else {
              this.itemValue = this.itemValue + ((+product.quantity) * (+product.price));
              console.log('Item price-', this.itemValue);
        }
        console.log('ItemValue', this.itemValue);
        const budgetIndex = this.budgetAfterApproving.findIndex(exist => exist.location === loc && exist.department === dept);

        if (budgetIndex < 0) {
              this.locationService.getSpentLocDept(loc, dept).subscribe(spent => {
              const exp = spent[0].total_spent === null ? 0 : spent[0].total_spent ;
              console.log(exp);
              this.budgetService.getBudgetByDept(dept, loc).subscribe((result: any) => {
                      this.budgetAfterApproving.push({
                        department: dept,
                        location: loc,
                        budget: (+result.current_balance - +exp)
                      });
                      console.log(this.budgetAfterApproving);
                      const i = this.budgetAfterApproving.findIndex(exist => exist.location === loc && exist.department === dept);
                      if (this.itemValue > +this.budgetAfterApproving[i].budget) {
                            this.lowBudgetDept = dept;
                            this.lowBudget = this.budgetAfterApproving[i].budget - this.itemValue;
                            this.itemValue = this.itemValue - ((+product.quantity) * (+product.price));
                            console.log('Item price-', this.itemValue);
                            console.log('low budget dept- ', this.lowBudgetDept);
                            this.openDialog();
                      } else {
                        this.additionItem(itemAdd, addedDepartment, addedItemIndex, this.itemValue);
                    }
              }, err => {
                console.log(err);
              });
            }, err => {
              console.log(err);
            });
        } else {
            console.log('Non Present', this.budgetAfterApproving[budgetIndex].budget);
            if (this.itemValue > this.budgetAfterApproving[budgetIndex].budget) {
                  this.lowBudgetDept = this.budgetAfterApproving[budgetIndex].department;
                  this.lowBudget = this.budgetAfterApproving[budgetIndex].budget - this.itemValue;
                  this.itemValue = this.itemValue - ((+product.quantity) * (+product.price));
                  console.log('Item price-', this.itemValue);
                  console.log('low budget dept- ', this.lowBudgetDept);
                  this.openDialog();
            } else {
              this.additionItem(itemAdd, addedDepartment, addedItemIndex, this.itemValue);
            }
        }
    }
  }

  removeOrderItem(i: number, item: any) {
    console.log('MultiLocs before removal', this.multiLocs);
    console.log('FinalItem before removal', this.finalItem);
    const lexist = this.finalItem.filter(loc => loc.location === item.location &&
      loc.department === item.department);
    if (lexist.length === 1) {
      const doExist = this.multiLocs.findIndex(loc => loc.location === item.location &&
        loc.department === item.department);
      this.multiLocs.splice(doExist, 1);
    }
    this.finalItem.splice(i, 1);
    this.lowBudgetDept = '';
    this.itemValue = this.itemValue - ((+item.quantity) * (+item.price));
    const locExist = this.multiLocs.findIndex(exist => exist.location === item.location
              && exist.department === item.department);
    if (locExist >= 0) {
    this.multiLocs[locExist].total_price = this.multiLocs[locExist].total_price - ((+item.quantity) * (+item.price));
    }

    console.log('MultiLocs after removal', this.multiLocs);
    console.log('FinalItem after removal', this.finalItem);
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

  // Adding the order on the database

  addOrder() {
    this.order.order_id = Math.floor(Math.random() * 10000) + 1;
    this.order.created_by = this.created_by;
    this.order.multiLocs = this.multiLocs;
    this.order.finalItem = this.finalItem;
    this.order.status = 'Pending';
    this.order.message = 'Pending for approval';
    this.order.color = 'primary';

    console.log('Actual Order', this.order);
    this.orderSub = this.http.post(environment.BASE_URL + 'order/order', this.order).subscribe((data: any) => {
      console.log(data);
      this.snackBar.open('Order Submitted Successfully', ' ', {duration: this.autoHide});
      this.router.navigate(['/request']);
    }, err => {
        console.log(err);
        if (err.length > 0) {
           alert(err[0].message);
        } else {
          this.snackBar.open(err.message, '', {duration: this.autoHide});
        }
      });
  }

  openDialog(): void {
    if (this.lowBudgetDept === '') {
      const dialogRef = this.dialog.open(MyDialogComponent, {
        data: {
          message: 'Please try again to add'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
   } else {
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
  }

  ngOnDestroy() {
     if (this.citiesSub) {
       this.citiesSub.unsubscribe();
     }
     if (this.departSub) {
       this.departSub.unsubscribe();
     }
     if (this.orderSub) {
       this.orderSub.unsubscribe();
     }
     if (this.imageSub) {
       this.imageSub.unsubscribe();
     }
  }
}

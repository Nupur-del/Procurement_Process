import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { MessageService } from '../message.service';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { ItemService } from '../../../../../src/app/item.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SeeOrderComponent } from '../see-order/see-order.component';
import { HttpClient, HttpParams} from '@angular/common/http';
import { POService } from '../po.service';
import { LoginService} from '../../../../../src/app/login.service';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {

  myFiles: string[] = [];
  imageNames: string[] = [];
  Option = 'No';
  uploadedImages: any = [];
  image: any;
  isRemovable = true;
  change = true;
  optional = false;
  totalAmount = 0;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  requireChange = true;
  userName: string;
  shipTobill: any;
  fName: any;
  displayedColumns: string[] = ['Order ID', 'Name', 'Specification', 'Quantity', 'Price', 'Brand'];
  fType: any;
  po: any = {};
  isLinear = false;
  todayDate:Date = new Date();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  total = 0;
  userID: number;
  type: string;
  order: any;
  sub: any;
  item = {
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
  message1: string;
  poDetails = [];
  actionButtonLabel = ':)';
  action = true;
  setAutoHide = true;
  requestor = [];
  dataSource: any;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  addExtraClass = false;

  constructor(private _formBuilder: FormBuilder,
              public snackBar: MatSnackBar,
              private message: MessageService,
              private itemService: ItemService,
              private dialog: MatDialog,
              private login: LoginService,
              private http: HttpClient,
              private poService: POService,
              private el: ElementRef) { }

ngOnInit() {

  this.type = localStorage.getItem('type');
  this.userID = +localStorage.getItem('userId');
  this.userName = localStorage.getItem('username');
  this.po.cmp_name = 'Tata Consultancy Services';

this.poService.getallPO().subscribe((data: any) => {
  if (data.length > 0) {
    this.po.billNo = data[data.length - 1].billNo + 1;
  } else {
    this.po.billNo = 1;
  }
});

this.login.getUser('Requestor').subscribe(requestors => {
  this.requestor = requestors;
})


this.message.poData.subscribe(data => {
  this.poDetails = data;
  this.dataSource = new MatTableDataSource<any>(this.poDetails);
  this.dataSource.paginator = this.paginator;
  this.po.currency = this.poDetails[0].currency;
  this.po.locationName = this.poDetails[0].locationName;
  this.po.location = this.poDetails[0].location;
  for (let i of this.poDetails) {
     this.totalAmount = this.totalAmount + +(i.price * i.quantity);
  }
  console.log('Total Amount', this.totalAmount);
  console.log(this.poDetails);
});

this.firstFormGroup = this._formBuilder.group({
  reqName: ['', Validators.required],
  urg_msg: ['', Validators.required],
  attachments: [''],
  reason: ['', Validators.required],
  comment: [''],
  option: [''],
  behalf: [''],
  purchase_type: ['', Validators.required]
});

this.secondFormGroup = this._formBuilder.group({
  billno: ['', Validators.required],
  currency: ['', Validators.required],
  cmp_name: ['', Validators.required],
  location: ['', Validators.required],
  bill_to_address: ['', Validators.required],
  shipTobill: ['', Validators.required],
  delivery_to: ['', Validators.required],
  required_by: ['', Validators.required],
  delivery_address: ['', Validators.required],
});

this.thirdFormGroup = this._formBuilder.group({
  cost_center: ['', Validators.required],
  project_code: ['', Validators.required],
  budget_code: ['', Validators.required],
});
}

insert() {
  const config = new MatSnackBarConfig();
  config.verticalPosition = this.verticalPosition;
  config.horizontalPosition = this.horizontalPosition;
  config.duration = this.setAutoHide ? this.autoHide : 0;
  this.snackBar.open(this.message1, this.action ? this.actionButtonLabel : undefined, config);
}

onFileChange(event) {
  // tslint:disable-next-line: prefer-for-of
  for (var i = 0; i < event.target.files.length; i++) {
    const name = event.target.files[i].name;
    let sample = String(name);
    this.myFiles.push(event.target.files[i]);
    this.imageNames.push(sample);

  }
  console.log(this.myFiles);
  console.log(this.imageNames);
  this.imageNames =  this.removeDuplicates(this.imageNames);
  this.change = false;
}

onUpload() {
  let formData = new FormData();
  for (let i = 0; i < this.myFiles.length; i++) {
    let image = this.uploadedImages[i] != null ? this.uploadedImages[i] : 'dummy';
    let compareImage = this.imageNames[i] != null ? this.imageNames[i] : 'compare';
    if (image.includes(compareImage) === false) {
      formData.append("file", this.myFiles[i]);
    }
  }
  console.log(formData);
  this.http.post(environment.BASE_URL + 'api/upload', formData).subscribe(
    // map the success function and alert the response
     (success) => {
             console.log(success);
             for( let i of success['file']) {
               this.uploadedImages.push(i.filename);
               console.log(this.uploadedImages);
             }
             alert('Uploaded Successfully.');
             this.isRemovable = false;
        },
    (error) => {
      console.log(error);
      alert(error);
     });

}

removeImage(i: number) {
  console.log(this.uploadedImages[i]);
  let params = new HttpParams().set('fileName', this.uploadedImages[i]);
  this.http.delete(environment.BASE_URL + 'api/deleteFile', { params: params }).subscribe( data => {
    alert(data['message']);
    console.log(data);
    this.uploadedImages.splice(i, 1);
    this.imageNames.splice(i, 1);
    this.myFiles.splice(i, 1);
    console.log(this.imageNames);
    console.log(this.uploadedImages);
    }, err => {
      JSON.parse(JSON.stringify(err));
    });
}

onReset() {
  this.image = null;
  alert('Please select new file');
}

removeDuplicates(arr) {
  var newarr = (function(arr){
    var m = {}, newarr = []
    for (var i=0; i<arr.length; i++) {
      var v = arr[i];
      if (!m[v]) {
        newarr.push(v);
        m[v] = true;
      }
    }
    return newarr;
  })(arr);

  return newarr;
}

disableFields() {
  this.optional = !this.optional;
  this.requireChange = !this.requireChange;
  this.fName = null;
  this.fType = null;
}
seeOrder() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxHeight = '90vh';
    const dialog = this.dialog.open(SeeOrderComponent, dialogConfig);
}

onSubmit() {
  if (!this.firstFormGroup.valid) {
    console.log('First Form', this.firstFormGroup);
    this.findInvalidControls(this.firstFormGroup);
    alert('Basic Details Form Is Invalid!');
  }
  if (!this.secondFormGroup.valid) {
    this.findInvalidControls(this.secondFormGroup);
    alert('Billing Details Form Is Invalid!');
  }
  if (!this.thirdFormGroup.valid) {
    this.findInvalidControls(this.thirdFormGroup);
    alert('Cost Booking Form Is Invalid!');
  }
  if (this.firstFormGroup.valid && this.secondFormGroup.valid &&
    this.thirdFormGroup.valid) {
    console.log(this.firstFormGroup);
    console.log(this.secondFormGroup);
    console.log(this.thirdFormGroup);
    this.po.item = [];
    if (this.Option === 'no') {
      this.po.behalf = this.userID;
    }
    this.po.supplier = this.poDetails[0].prefered_vendor;
    this.po.attachments = this.uploadedImages;
    this.po.total = this.totalAmount;
    this.po.status = 1;
    let newDate = new Date(this.po.required_by).toISOString();
    // newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
    this.po.required_by = newDate;
    console.log('Date', this.po.required_by);
    for (let i of this.poDetails) {
      this.po.item.push({
        order_id: i.order_id,
        item_id: i.id
      })
    }
    if (this.shipTobill === 'yes') {
      this.po.delivery_address = this.po.bill_to_address;
    }
    console.log(this.po.item);
    console.log('PO', this.po);
    const postatus: any =  this.poService.addPO(this.po);
    if (!postatus) {
      this.message1 = 'PO Created Sucessfully';
      this.insert();
    } else {
      alert(`Error with ${postatus} occurred`);
    }

  }
}

findInvalidControls(form: any) {
  const invalid = [];
  const controls = form.controls;
  for (const name in controls) {
      if (controls[name].invalid) {
          invalid.push(name);
          controls[name].markAsDirty();
      }
  }
}
}

import { Component, OnInit, ViewChild } from '@angular/core';
import {Invoice3Service} from '../invoice3.service';
import {environment} from '../../../../../src/environments/environment';
import {FormBuilder, Validators, FormGroup, NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import { MessageService } from '../message.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { CheckPOComponent } from '../check-po/check-po.component';
import { POService } from '../po.service';
import { Router } from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { LoginService } from 'src/app/login.service';

function check_date() {
  var x = Date.parse(document["invoice"]["invoice_date"].value);
  var y = Date.parse(document["invoice"]["invoice_due_date"].value);
  if (x > y) { return false; } else { return true; }
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  msg: string;
  actionButtonLabel = ':)';
  todayDate = new Date();
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  addExtraClass = false;
  due_date: any;
  date: any;
  item: any = {};
  statusDetails = [];
  displayedColumns = ['Order ID', 'Name', 'Quantity', 'Price', 'Total_Price', 'market_price',
                       'invoiced_quantity', 'Brand'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  type: any;
  userID: number;
  poList = [];
  locDetails = [];
  requestorDetails = [];
  po: any = {};
  invoice: any = {};
  sub: any;
  dataSource: any;
  brandDetails = [];
  isLinear = false;
  firstFormGroup: FormGroup;

  constructor(private invoice3Service: Invoice3Service,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private message: MessageService,
              private login: LoginService,
              private dialog: MatDialog,
              private poService: POService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.type = localStorage.getItem('type');
    this.userID = +localStorage.getItem('userId');
    this.message.poBillNo.subscribe(message => this.sub = message);
    console.log(this.sub);

  // this.http.get<any>(environment.BASE_URL + 'brand/brandName').subscribe(brandDetails => {
  //   this.brandDetails = brandDetails;
  this.http.get(environment.BASE_URL + 'order/getStatus')
  .subscribe((statusfromAPI: any) => {
    this.statusDetails = statusfromAPI;
    // this.login.getUser('Requestor').subscribe(user => {
    //   this.requestorDetails = user;
    // this.http.get(environment.BASE_URL + 'cities/locationDetails')
    //   .subscribe((loc: any) => {
    //   this.locDetails = loc;
    //   this.login.getSupplier().subscribe(supp => {
  this.poService.getPoByBillNo(this.sub).subscribe((data: any) => {
    const tableData = [];
    for (let i of data) {
      if (i.itemStatus === 'Item Delivered') {
        tableData.push({
          ...i,
          locationName: i.locationName,
          supplierName: i.supplierName,
          poStatus: i.poStatus,
          brandName: i.brandName
        })
      }
    }
    this.dataSource = new MatTableDataSource(tableData);
    this.dataSource.paginator = this.paginator;
    this.poList = tableData;
    console.log(this.poList);
   });
  });
//  });
// });
//     });
//   });
  this.firstFormGroup = this.formBuilder.group({
    credit_days: ['', Validators.required],
    invoice_address: ['', Validators.required],
    description: ['', Validators.required],
    tax: ['', Validators.required]
  });
  }

  caltotal() {
    let initialTotal = 0;
    for (let i of this.poList) {
      initialTotal = initialTotal + (i.price * i.quantity);
    }
    console.log(this.invoice.tax);
    console.log(initialTotal);
    const modified_total = initialTotal + this.invoice.tax;
    this.poList[0].total = modified_total;
  }

  insert() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.msg, this.action ? this.actionButtonLabel : undefined, config);
  }
  seePO() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = '80%';
      dialogConfig.maxHeight = '90vh';
      const dialog = this.dialog.open(CheckPOComponent, dialogConfig);
  }
  addDateEvent(event) {
    this.date = this.convertDate(event.value);
  }
  addDateEvent2(event) {
    this.due_date = this.convertDate(event.value);
  }

  convertDate(str) {
    // tslint:disable-next-line: one-variable-per-declaration
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  onSubmit(form: NgForm) {
    console.log(form);
    let total_amount = 0;
    if (this.firstFormGroup.valid) {
      this.invoice.billNo = this.sub;
      this.invoice.item = [];
      for (let i = 0; i < this.poList.length; i++) {
        this.invoice.item.push({
          market_price: form.value[`market_price${i}`],
          invoiced_quantity: form.value[`invoiced_quantity${i}`],
          item_id: this.poList[i].id,
          total_price: this.poList[i].price * this.poList[i].quantity,
        });
      total_amount = total_amount + (this.poList[i].price * this.poList[i].quantity);
      }
      this.invoice.invoice_date =  this.date;
      this.invoice.invoice_due_date =  this.due_date;
      this.invoice.total = total_amount + this.invoice.tax;
      this.invoice.invoice_address = this.poList[0].bill_to_address;
      console.log(this.invoice);
      this.http.post(environment.BASE_URL + 'invoice/invoice', this.invoice).subscribe(data => {
        console.log(data);
        this.msg = 'Invoice Created Successfully';
        const updatePo = {
           billNo: this.invoice.billNo,
           invoice_status: this.statusDetails.find(c => c.orderStatus === 'Invoice_created').id
        };
        this.http.post(environment.BASE_URL + 'Purchase_order/update_invoice_status', updatePo)
        .subscribe(updated => {
          console.log(updated);
        });
        this.insert();
        this.router.navigate(['/deliveredPO']);
        }, err => {
          console.log(err);
          alert('Sorry try again later');
      });
    } else {
      alert('Please fill all the fields');
      for (var control in this.firstFormGroup.controls) {
        if (this.firstFormGroup.controls[control].invalid) {
          this.firstFormGroup.controls[control].markAsDirty();
        }
      }
      // for (var control in this.secondFormGroup.controls) {
      //   if (this.secondFormGroup.controls[control].invalid) {
      //     this.secondFormGroup.controls[control].markAsDirty();
      //   }
      // }
      return;
    }
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { LoginService} from '../../../../../src/app/login.service';
import {environment} from '../../../../../src/environments/environment';
import {FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { MessageService } from '../message.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CheckPOComponent } from '../check-po/check-po.component';
import { POService } from '../po.service';
import { Router } from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {

  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  @ViewChild('myTable', {static: false}) myTable: ElementRef;
  msg: string;
  actionButtonLabel = ':)';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  addExtraClass = false;
  due_date: any;
  date: any;
  dataSource: any;
  displayedColumns = ['name', 'Quantity','Invoiced_Quantity', 'Price' , 'Market_Price', 'Total_Price', 'Brand'];
  item: any = {};
  po: any = {};
  invoice = [];
  sub: any;
  type: any;
  userID: number;
  locDetails = [];
  requestorDetails = [];
  statusDetails = [];
  deptDetails = [];
  isLinear = false;
  firstFormGroup: FormGroup;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  secondFormGroup: FormGroup;

  constructor(private http: HttpClient,
              private message: MessageService,
              private dialog: MatDialog,
              private poService: POService,
              private login: LoginService,
              private router: Router,
              private snackBar: MatSnackBar) { }


  ngOnInit() {
  this.message.poBillNo.subscribe(message => this.sub = message);
  this.type = localStorage.getItem('type');
  this.userID = +localStorage.getItem('userId');

  this.login.getUser('Requestor').subscribe(req => {
    this.requestorDetails = req;
    this.http.get(environment.BASE_URL + 'department/deptDetails').subscribe((dept: any) => {
      this.deptDetails = dept;
     this.http.get(environment.BASE_URL + 'cities/locationDetails')
      .subscribe((loc: any) => {
      this.locDetails = loc;
      this.http.get(environment.BASE_URL + 'order/getStatus').subscribe((sta: any) => {
        this.statusDetails = sta;
        this.http.get<any>(environment.BASE_URL + 'brand/brandName').subscribe(brandDetails => {
  this.poService.getInvoiceByBillNo(this.sub).subscribe((invoicedata: any) => {
    console.log(invoicedata);
    const invoiceD = [];
    for (let i of invoicedata) {
      invoiceD.push({
        ...i,
        creator: this.requestorDetails.find(v => v.id === i.created_by).name,
        locationName: this.locDetails.find(c => c.locLocationPK === i.location).locName,
        departmentName: this.deptDetails.find(s => s.id === i.department).department_name,
        status: this.statusDetails.find(s => s.id === i.status).orderStatus,
        brandName: brandDetails.find(v => v.brandpk === i.brand).brandName
      })
    }
    this.dataSource = new MatTableDataSource(invoiceD);
    this.dataSource.paginator = this.paginator;
    this.invoice = invoiceD;
  });
});
      });
    });
    });
  });
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
  var date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2),
             day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
  }

  downloadAsPDF() {
    var dataOfTable = [];
    this.invoice.forEach(e => {
      var temp = [];
      temp.push(e.order_id);
      temp.push(e.item_id);
      temp.push(e.name);
      temp.push(e.price);
      temp.push(e.quantity);
      temp.push(e.price * e.quantity);
      temp.push(e.market_price);
      temp.push(e.invoiced_quantity);
      dataOfTable.push(temp);
    })
    const doc = new jsPDF();

    doc.autoTable({html: '#mytable'});
    doc.autoTable({html: '#myTable'});

    doc.save('invoice.pdf');
    this.router.navigate(['/deliveredPO']);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import {SeePOComponent} from '../see-po/see-po.component';
import {MatPaginator} from '@angular/material/paginator';
import { environment } from '../../../../../src/environments/environment';
import { POService } from '../po.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Sort } from '@angular/material';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/login.service';
import { Invoice3 } from '../invoice3';

@Component({
  selector: 'app-delivered-po',
  templateUrl: './delivered-po.component.html',
  styleUrls: ['./delivered-po.component.scss']
})
export class DeliveredPoComponent implements OnInit {

  sub: any;
  dataSource: any;
  type: any;
  userID: any;
  locDetails = [];
  statusDetails = [];
  requestorDetails = [];
  totalAmount: any;
  suppliers = [];
  poList: any = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[];

  constructor(private router: Router,
              private poService: POService,
              private message: MessageService,
              private login: LoginService,
              private dialog: MatDialog,
              private http: HttpClient) { }

  ngOnInit() {
    this.type = localStorage.getItem('type');
    this.userID = +localStorage.getItem('userId');

    if (this.type === 'Supplier') {
      this.displayedColumns = ['billNo', 'reqName', 'org_billed', 'Urgent', 'Location', 'total', 'required_by',
      'tracking_link' ,'status','details', 'create', 'viewInvoice'];
    } else {
      this.displayedColumns = ['billNo', 'reqName', 'org_billed', 'Urgent', 'Location', 'total', 'required_by',
      'supplier', 'tracking_link' ,'status','details', 'viewInvoice'];
    }

    this.http.get(environment.BASE_URL + 'order/getStatus')
    .subscribe((statusfromAPI: any) => {
      this.statusDetails = statusfromAPI;
      this.login.getUser('Requestor').subscribe(user => {
        this.requestorDetails = user;
        console.log(this.requestorDetails);
      this.http.get(environment.BASE_URL + 'cities/locationDetails')
        .subscribe((loc: any) => {
        this.locDetails = loc;
        this.login.getSupplier().subscribe(supp => {
    let status = this.statusDetails.find(s => s.orderStatus === 'Item Delivered').id;
    this.poService.getPOByStatus(status, this.type, this.userID).subscribe((data: any) => {
      console.log(data);
      const tableData = [];
      for (let i of data) {
        if (i.invoice_status === 0) {
          i.invoice_status = 13;
        }
       tableData.push({
         ...i,
         creator: this.requestorDetails.find(a => a.id === i.created_by).name,
         locationName: this.locDetails.find(c => c.locLocationPK === i.location).locName,
         supplierName: supp.find(d =>  d.id === i.supplier).name,
         poStatus: this.statusDetails.find(s => s.id=== i.po_status).orderStatus,
         invoice_status: this.statusDetails.find(a => a.id === i.invoice_status).orderStatus
       })
      }
      this.dataSource = new MatTableDataSource(tableData);
      this.dataSource.paginator = this.paginator;
      this.poList = data;
      console.log(this.poList);
     });
   });
 });
      });
    });
    this.message.currentMessage.subscribe(message => this.sub = message);
  }

  applySearch(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  seePO(billNo: any) {
    this.message.changeBillNo(billNo);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxHeight = '90vh';
    const dialog = this.dialog.open(SeePOComponent, dialogConfig);
  }

  sortOrder(sort: Sort) {
    const data = this.poList.slice();
    if (!sort.active || sort.direction === '') {
       this.dataSource = data;
       return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
         case 'billNo': return this.compare(a.billNo, b.billNo, isAsc);
         case 'reqName': return this.compare(a.creator, b.creator, isAsc);
         case 'required_by': return this.compare(a.required_by, b.required_by, isAsc);
         case 'total' : return this.compare(a.total, b.total, isAsc);
         default: return 0;
      }
   });
  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onClick(billNo: any) {
  this.message.changeBillNo(billNo);
  this.router.navigate(['/invoice']);
  }

  onView(billNo) {
  this.message.changeBillNo(billNo);
  this.router.navigate(['/invoiceView']);
  }

}

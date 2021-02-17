import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import {SeePOComponent} from '../see-po/see-po.component';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { environment } from '../../../../../src/environments/environment';
import { POService } from '../po.service';
import { Sort } from '@angular/material';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-approved-po',
  templateUrl: './approved-po.component.html',
  styleUrls: ['./approved-po.component.scss']
})
export class ApprovedPOComponent implements OnInit {

  sub: any;
  dataSource: any;
  poList: any = [];
  type: any;
  userID: any;
  locDetails = [];
  requestorDetails = [];
  statusDetails = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns = [];
  constructor(private router: Router,
              private poService: POService,
              private message: MessageService,
              private dialog: MatDialog,
              private http: HttpClient) {}

  ngOnInit() {

    this.type = localStorage.getItem('type');
    this.userID = +localStorage.getItem('userId');

    if(this.type === 'Requestor') {
     this.displayedColumns = ['billNo', 'reqName', 'org_billed', 'Urgent', 'Location', 'total', 'required_by',
     'supplier', 'tracking_link' ,'status','details'];
    } else {
     this.displayedColumns = ['billNo', 'reqName', 'org_billed', 'Urgent', 'Location', 'total', 'required_by',
  'tracking_link','status','details', 'view'];
    }

    // this.http.get(environment.BASE_URL + 'order/getStatus')
    // .subscribe((statusfromAPI: any) => {
    //   this.statusDetails = statusfromAPI;
    //   const status = this.statusDetails.find(s => s.orderStatus === 'Pending').id;
    //   this.login.getUser('Requestor').subscribe(user => {
    //     this.requestorDetails = user;
    //   this.http.get(environment.BASE_URL + 'cities/locationDetails')
    //     .subscribe((loc: any) => {
    //     this.locDetails = loc;
    //     this.login.getSupplier().subscribe(supp => {
    this.poService.getInProgressPO(this.type, this.userID).subscribe((data: any) =>{
      console.log(data);
      const tableData = [];
      for (let i of data) {
       tableData.push({
         ...i,
         creator: i.admName,
         locationName: i.locName,
         supplierName: i.venName,
         poStatus: i.orderStatus
       })
      }
      this.dataSource = new MatTableDataSource(tableData);
      this.dataSource.paginator = this.paginator;
      this.poList = data;
    });
//   });
// });
//  });
//     });
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
         case 'order_id': return this.compare(a.order_id, b.order_id, isAsc);
         case 'reqName': return this.compare(a.reqName, b.reqName, isAsc);
         default: return 0;
      }
   });
  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
 }

 onView(billNo: any) {
  this.message.changeBillNo(billNo);
  this.router.navigate(['/poTrack']);
 }

 onCancel(billNo, item_id, order_id) {
  let po: any = {};
  po.message = prompt('Reason for cancellation');
  if (po.message) {
  po.status = 'Cancelled';
  po.po_status = 'Cancelled';
  po.action = 'update';
  po.billNo = billNo;
  po.order_id = order_id;
  po.item_id = item_id;
  console.log(po);
  this.http.post(environment.BASE_URL + 'Purchase_order/update_po_status', po).subscribe(data => {
    console.log(data);
    this.router.navigate(['/supplierHome']);
  }, err => {
  console.log(err);
  });
  }
 }
}

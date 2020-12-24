import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {SeePOComponent} from '../see-po/see-po.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { environment} from '../../../../../src/environments/environment';
import { MatTableFilter } from 'mat-table-filter';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { LoginService} from '../../../../../src/app/login.service';
import { POService } from '../po.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Sort } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { MessageService } from '../message.service';

// export class  SpaceCraft {
//   creator: string;
//   locationName: string;
//   billNo: number;
// }

@Component({
  selector: 'app-pending-po',
  templateUrl: './pending-po.component.html',
  styleUrls: ['./pending-po.component.scss']
})
export class PendingPOComponent implements OnInit {

  sub: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource: any;
  statusDetails = [];
  userID: any;
  actionButtonLabel = ':)';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  type: any;
  // filterEntity: SpaceCraft;
  // filterType: MatTableFilter;
  message1: string;
  locDetails = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  poList: any = [];
  requestorDetails = [];
  displayedColumns: string[] = ['billNo', 'reqName', 'Urgent', 'org_billed', 'total', 'Location',
  'required_by', 'supplier', 'details', 'status', 'view'];

  constructor(private router: Router,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private login: LoginService,
              private poService: POService,
              private message: MessageService) { }

  ngOnInit() {
    this.type = localStorage.getItem('type');
    this.userID = +localStorage.getItem('userId');
    this.http.get(environment.BASE_URL + 'order/getStatus')
    .subscribe((statusfromAPI: any) => {
      this.statusDetails = statusfromAPI;
      const status = this.statusDetails.find(s => s.orderStatus === 'Pending').id;
      this.login.getUser('Requestor').subscribe(user => {
        this.requestorDetails = user;
      this.http.get(environment.BASE_URL + 'cities/locationDetails')
        .subscribe((loc: any) => {
        this.locDetails = loc;
        this.login.getSupplier().subscribe(supp => {
     this.poService.getPOByStatus(status, this.type, this.userID).subscribe((data: any) =>{
      const tableData = [];
      for (let i of data) {
       tableData.push({
         ...i,
         creator: this.requestorDetails.find(a => a.id === i.created_by).name,
         locationName: this.locDetails.find(c => c.locLocationPK === i.location).locName,
         supplierName: supp.find(d =>  d.id === i.supplier).name,
         poStatus: this.statusDetails.find(s => s.id=== i.po_status).orderStatus
        })
      }
      // this.filterEntity = new SpaceCraft();
      // this.filterType = MatTableFilter.ANYWHERE;
      this.dataSource = new MatTableDataSource(tableData);
      this.dataSource.paginator = this.paginator;
      this.poList = tableData;
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

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ngOnInit();
      // this.getTableData();
      refresher.target.complete();
    }, 2000);
  }

  insert() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.message1, this.action ? this.actionButtonLabel : undefined, config);
  }

  seePO(billNo: any) {
    this.message.changeBillNo(billNo);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.maxHeight = '90vh';
    const dialog = this.dialog.open(SeePOComponent, dialogConfig);
  }

  removePO(billNo: any, referesher) {
    let deleteParams = new HttpParams().set('billNo', billNo);
    let updateData = [];
    this.http.get(environment.BASE_URL + 'Purchase/fetchOrders', {params: deleteParams}).subscribe((po: any) => {
      for( let i of po) {
        updateData.push({
          id: i.item_id,
          status: 4
        })
      }
       this.http.delete(environment.BASE_URL + 'Purchase/removePO', {params: deleteParams}).subscribe(deleted => {
          console.log(deleted);
          this.http.put(environment.BASE_URL + 'Purchase_order/updateItem_Status', updateData).subscribe(updated => {
            this.message1 = 'Deleted successfully';
            console.log(updated);
            this.insert();
            this.doRefresh(referesher);
          }, error => {
            console.log(error);
            this.message1 = error.message;
            this.insert();
          })
       }, err => {
         console.log(err);
         this.message1 = err.message;
         this.insert();
       });
    });
  }

  sortOrder(sort: Sort) {
    const data = this.poList.slice();
    console.log(data);
    if (!sort.active || sort.direction === '') {
       this.dataSource = data;
       return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
         case 'billNo': return this.compare(a.billNo, b.billNo, isAsc);
         case 'total': return this.compare(a.total, b.total, isAsc);
         case 'required_by': return this.compare(a.required_by, b.required_by, isAsc);
         case 'reqName': return this.compare(a.creator, b.creator, isAsc);
         default: return 0;
      }
   });

  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
 }

 onView(billNo: any)
 {
  this.message.changeBillNo(billNo);
  this.router.navigate(['/viewPO']);
 }

}

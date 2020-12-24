import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import {SeePOComponent} from '../see-po/see-po.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { environment } from '../../../../../src/environments/environment';
import { POService } from '../po.service';
import { Sort } from '@angular/material';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-denied-po',
  templateUrl: './denied-po.component.html',
  styleUrls: ['./denied-po.component.scss']
})
export class DeniedPOComponent implements OnInit {

  sub: any;
  dataSource: any;
  userID: number;
  statusDetails: any;
  type: any;
  locDetails = [];
  deptDetails = [];
  requestorDetails = [];
  poList: any = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['billNo', 'reqName', 'Urgent', 'org_billed', 'total', 'Location',
  'required_by', 'supplier', 'status', 'details'];
  constructor(private router: Router,
              private poService: POService,
              private login: LoginService,
              private dialog: MatDialog,
              private message: MessageService,
              private http: HttpClient) { }

  ngOnInit() {
    this.type = localStorage.getItem('type');
    this.userID = +localStorage.getItem('userId');
    this.http.get(environment.BASE_URL + 'order/getStatus')
    .subscribe((statusfromAPI: any) => {
      this.statusDetails = statusfromAPI;
      const status = this.statusDetails.find(s => s.orderStatus === 'PO Denied').id;
      this.login.getUser('Requestor').subscribe(user => {
        this.requestorDetails = user;
        console.log(this.requestorDetails);
      this.http.get(environment.BASE_URL + 'cities/locationDetails')
        .subscribe((loc: any) => {
        this.locDetails = loc;
        this.login.getSupplier().subscribe(supp => {
     this.poService.getPOByStatus(status, this.type, this.userID).subscribe((data: any) =>{
      const tableData = [];
      console.log(data);
      console.log(this.requestorDetails);
      for (let i of data) {
       tableData.push({
         ...i,
         creator: this.requestorDetails.find(a => a.id === i.created_by).name,
         locationName: this.locDetails.find(c => c.locLocationPK === i.location).locName,
         supplierName: supp.find(d =>  d.id === i.supplier).name,
         poStatus: this.statusDetails.find(s => s.id=== i.po_status).orderStatus
       })
      }
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
         case 'total': return this.compare(a.total, b.total, isAsc);
         default: return 0;
      }
   });
  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
 }

 seePO(billNo: any) {
  this.message.changeBillNo(billNo);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.width = '80%';
  dialogConfig.maxHeight = '90vh';
  const dialog = this.dialog.open(SeePOComponent, dialogConfig);
}

}

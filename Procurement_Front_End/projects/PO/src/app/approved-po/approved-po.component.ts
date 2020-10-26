import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
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
  displayedColumns: string[] = ['Bill No', 'Order Id', 'Request Name', 'org_billed', 'view', 'cancel'];
  constructor(private router: Router,
              private poService: POService,
              private message: MessageService,
              private http: HttpClient) { }

  ngOnInit() {
    this.poService.getInProgressPO().subscribe((data: any) =>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.poList = data;
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
  this.sub = billNo;
  this.message.changeMessage(this.sub);
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

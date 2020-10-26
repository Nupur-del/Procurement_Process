import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { POService } from '../po.service';
import { Sort } from '@angular/material';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delivered-po',
  templateUrl: './delivered-po.component.html',
  styleUrls: ['./delivered-po.component.scss']
})
export class DeliveredPoComponent implements OnInit {

  sub: any;
  dataSource: any;
  poList: any = [];
  displayedColumns: string[] = ['Bill No', 'Order Id', 'Item Id',
  'Item Name', 'Request Name', 'org_billed', 'create', 'viewInvoice'];

  constructor(private router: Router,
              private poService: POService,
              private message: MessageService,
              private http: HttpClient) { }

  ngOnInit() {
    let status = 'Item Delivered';
    this.poService.getPOItemByStatus(status).subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.poList = data;
      console.log(this.poList);
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
  onClick(billNo: any) {
  this.sub = billNo;
  this.message.changeMessage(this.sub);
  this.router.navigate(['/invoice']);
  }
  onView(billNo) {
  this.sub = billNo;
  this.message.changeMessage(this.sub);
  this.router.navigate(['/viewInvoice']);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import {POService} from '../po.service';
import { LoginService} from '../../../../../src/app/login.service';
import {environment} from '../../../../../src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { MessageService } from '../message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {Location} from '@angular/common';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {
  sub2: any;
  sub: any;
  items: any;
  requestorDetails = [];
  locDetails = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  statusDetails = [];
  deptDetails = [];
  error = false;
  dataSource: any;
  displayedColumns = ['name', 'Location', 'Department', 'Quantity', 'Price' , 'Total_Price', 'Brand'];
  message = '';

  constructor(private poService: POService,
              private messageService: MessageService,
              private http: HttpClient,
              private login: LoginService,
              private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.messageService.poBillNo.subscribe(message => this.sub = message);


    // this.login.getUser('Requestor').subscribe(req => {
    //   this.requestorDetails = req;
    //   this.http.get(environment.BASE_URL + 'department/deptDetails').subscribe((dept: any) => {
    //     this.deptDetails = dept;
    //    this.http.get(environment.BASE_URL + 'cities/locationDetails')
    //     .subscribe((loc: any) => {
    //     this.locDetails = loc;
    //     this.http.get(environment.BASE_URL + 'order/getStatus').subscribe((sta: any) => {
    //       this.statusDetails = sta;
    //       this.http.get<any>(environment.BASE_URL + 'brand/brandName').subscribe(brandDetails => {
    this.poService.getPoByBillNo(this.sub).subscribe((POdata: any) => {
      console.log(POdata);
      if (!POdata || POdata.length === 0) {
        this.error = true;
        this.message = 'Please check the order id, Purchase Order has not received';
      } else if (POdata[0].poStatus === 'PO Denied') {
          this.error = true;
          this.message = 'Order is cancelled by the Supplier'
      } else {
      const trackeData = [];
      for (let i of POdata) {
        if (i.itemStatus !== 'PO Denied') {
        trackeData.push({
          ...i,
          locationName: i.locationName,
          departmentName: i.departmentName,
          status: i.itemStatus,
          brandName: i.brandName,
          poStatus: i.poStatus
        })
       }
      }
      this.dataSource = new MatTableDataSource(trackeData);
      this.dataSource.paginator = this.paginator;
      this.items = trackeData;
      console.log(this.items);
    }
    });
  // });
  //       });
  //     });
  //     });
  //   });
  }

  getInvoice (billNo) {
    this.messageService.changeBillNo(billNo);
    this.router.navigate(['/invoiceView']);
  }

  onBack() {
    this.location.back();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import {POService} from '../po.service';
import { LoginService} from '../../../../../src/app/login.service';
import {environment} from '../../../../../src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MessageService } from '../message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';

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
              private activate: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.messageService.poBillNo.subscribe(message => this.sub = message);


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
    this.poService.getPoByBillNo(this.sub).subscribe((POdata: any) => {
      console.log(POdata);
      if (!POdata || POdata.length === 0) {
        this.error = true;
        this.message = 'Please check the order id, Purchase Order has not received';
      } else {
      const trackeData = [];
      for (let i of POdata) {
        trackeData.push({
          ...i,
          creator: this.requestorDetails.find(v => v.id === i.created_by).name,
          locationName: this.locDetails.find(c => c.locLocationPK === i.location).locName,
          departmentName: this.deptDetails.find(s => s.id === i.department).department_name,
          status: this.statusDetails.find(s => s.id === i.status).orderStatus,
          brandName: brandDetails.find(v => v.brandpk === i.brand).brandName,
          poStatus: this.statusDetails.find(a => a.id === i.po_status).orderStatus
        })
      }
      this.dataSource = new MatTableDataSource(trackeData);
      this.dataSource.paginator = this.paginator;
      this.items = trackeData;
      console.log(this.items);
    }
    });
  });
        });
      });
      });
    });

  }

  getInvoice (billNo) {
    this.messageService.changeBillNo(billNo);
    this.router.navigate(['/invoiceView']);
  }

  onBack() {
    this.router.navigate(['../'], {relativeTo: this.activate});
  }

}

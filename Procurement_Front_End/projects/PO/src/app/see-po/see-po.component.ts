import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';
import {POService} from '../po.service';
import { MatTableDataSource } from '@angular/material';
import {environment} from '../../../../../src/environments/environment';
import {HttpClient, HttpParams } from '@angular/common/http';
import {LoginService} from  '../../../../../src/app/login.service';

@Component({
  selector: 'app-see-po',
  templateUrl: './see-po.component.html',
  styleUrls: ['./see-po.component.scss']
})
export class SeePOComponent implements OnInit {

  requestorDetails = [];
  locDetails = [];
  billNo: number;
  creator: string;
  Urgent: string;
  Exists = false;
  totalAmount: any;
  statusDetails = [];
  poDetails = [];
  deptDetails = [];
  poStatus: any;
  dataSource: any;
  displayedColumns = ['order_id','Name', 'Specification', 'Quantity', 'Price', 'location',
  'department', 'status'];
  constructor(private message: MessageService,
              private po: POService,
              private http: HttpClient,
              private login: LoginService) { }

  ngOnInit() {
     this.message.poBillNo.subscribe(data => {
       this.billNo = data;
       console.log(data);
       this.login.getUser('Requestor').subscribe(req => {
         this.requestorDetails = req;
         this.http.get(environment.BASE_URL + 'department/deptDetails').subscribe((dept: any) => {
           this.deptDetails = dept;
          this.http.get(environment.BASE_URL + 'cities/locationDetails')
           .subscribe((loc: any) => {
           this.locDetails = loc;
           this.http.get(environment.BASE_URL + 'order/getStatus').subscribe((sta: any) => {
             this.statusDetails = sta;
             this.po.getPoByBillNo(this.billNo).subscribe(poData => {
               console.log(poData);
              for (let i of poData) {
                this.poDetails.push({
                  ...i,
                  creator: this.requestorDetails.find(a => a.id === i.created_by).name,
                  locationName: this.locDetails.find(c => c.locLocationPK === i.location).locName,
                  departmentName: this.deptDetails.find(s => s.id === i.department).department_name,
                  status: this.statusDetails.find(s => s.id === i.status).orderStatus
                })
                if (i.status === 6) {
                  this.Exists = true;
                }
              }
              this.creator = this.poDetails[0].creator;
              this.Urgent = this.poDetails[0].urg_msg;
              this.poStatus = this.statusDetails.find(j => j.id === this.poDetails[0].po_status).orderStatus;
              this.totalAmount = this.poDetails[0].total;
              this.dataSource = new MatTableDataSource(this.poDetails);
            }, error => {
              console.log(error);});
           }, error1 => {
            console.log(error1);});
         }, error2 => {
          console.log(error2);});
       }, error3 => {
        console.log(error3);});
     }, error4 => {
      console.log(error4);});
    }, error5 => {
      console.log(error5);});
  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import {SelectionModel} from '@angular/cdk/collections';
import { POService } from '../po.service';
import { HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-view-po',
  templateUrl: './view-po.component.html',
  styleUrls: ['./view-po.component.scss']
})
export class ViewPOComponent implements OnInit {
  sub: any;
  po: any;
  imageNames: any = [];
  billNo: any;
  locDetails = [];
  deptDetails = [];
  totalAmount: any;
  creator: any;
  displayedColumns = ['select','order_id', 'item_id', 'name', 'Specification', 'Quantity', 'Price','Brand'];
  poDetails = [];
  selection  = new SelectionModel<any>(true, []);
  decisionMessage: any;
  requestorDetails = [];
  dataSource: any;
  brandDetails = [];
  Urgent: any;
  loc: any;
  poStatus: any;
  statusDetails = [];
  isLinear = false;

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private login: LoginService,
              private message: MessageService,
              private poService: POService,
              private http: HttpClient) { }

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
          this.http.get<any>(environment.BASE_URL + 'brand/brandName').subscribe(brandDetails => {
            this.brandDetails = brandDetails;
          this.http.get(environment.BASE_URL + 'order/getStatus').subscribe((sta: any) => {
            this.statusDetails = sta;
            this.poService.getPoByBillNo(this.billNo).subscribe(poData => {
              console.log(poData);
              const actual = [];
             for (let i of poData) {
               actual.push({
                 ...i,
                 creator: this.requestorDetails.find(a => a.id === i.created_by).name,
                 locationName: this.locDetails.find(c => c.locLocationPK === i.location).locName,
                 departmentName: this.deptDetails.find(s => s.id === i.department).department_name,
                 status: this.statusDetails.find(s => s.id === i.status).orderStatus,
                 brandName: this.brandDetails.find(v => v.brandpk === i.brand).brandName,
                 deliverPerson: this.requestorDetails.find(v => v.id === i.delivery_to).name
               })
             }
             this.poDetails = actual;
             this.creator = this.poDetails[0].creator;
             this.Urgent = this.poDetails[0].urg_msg;
             this.totalAmount = this.poDetails[0].total;
             this.loc = this.locDetails.find(c => c.locLocationPK === this.poDetails[0].location).locName,
             this.poStatus = this.statusDetails.find(j => j.id === this.poDetails[0].po_status).orderStatus;
             console.log(this.poDetails);
             this.dataSource = new MatTableDataSource(this.poDetails);
           }, error => {
             console.log(error);});
            }, error9 => {
              console.log(error9);});
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

    this.poService.getAttachmentsByBillNo(this.billNo).subscribe((data: any) => {
      console.log(data);
      this.imageNames = data;
      console.log(this.imageNames);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onDecision(decision, message, item?: any) {
   console.log(item);
      if(message.length > 0) {
        let po: any = {};
        po.po_status = this.statusDetails.find(j => j.orderStatus === decision).id;
        po.action = 'update';
        po.total = this.totalAmount;
        console.log(po.total);
        po.item = [];
        if (decision === 'PO Approved') {
          for (let i of this.poDetails) {
                const exists = item.some(a => a.id === i.id);
                console.log(exists);
                if (exists === true) {
                  po.item.push({
                    id : i.id,
                    order_id : i.order_id,
                    status: this.statusDetails.find(j => j.orderStatus === decision).id
                });
                } else {
                  po.item.push({
                    id : i.id,
                    order_id : i.order_id,
                    status: this.statusDetails.find(j => j.orderStatus === 'PO Denied').id
                  });
                  let detail = this.poDetails.find(a => a.id === i.id);
                  po.total = po.total - (detail.price * detail.quantity);
               }
            }
        } else {
          for (let i of this.poDetails) {
            po.item.push({
              id: i.id,
              order_id: i.order_id,
              status: this.statusDetails.find(j => j.orderStatus === 'PO Denied').id
            })
          }
        }
          po.billNo = this.billNo;
          po.message = message;
          console.log(po);
          this.http.put(environment.BASE_URL + 'Purchase/update_po_status' , po).subscribe((data: any) =>{
          console.log(data);
              if (decision === 'PO Approved') {
                this.router.navigate(['/approvedPO']);
              } else {
                this.router.navigate(['/deniedPO']);
              }
        }, err => {
        console.log(err);
        });
      } else {
        this.snackBar.open('Please mention the reason', ' ', {duration : 2000});
      }
   }
}

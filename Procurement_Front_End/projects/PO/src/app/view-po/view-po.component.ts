import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import {SelectionModel} from '@angular/cdk/collections';
import { POService } from '../po.service';
import {BudgetService} from '../../../../../src/app/budget.service';
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
  budgetDetails = [];
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
  Image_url = environment.IMAGE_URL;
  isLinear = false;

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private login: LoginService,
              private budgetService: BudgetService,
              private message: MessageService,
              private poService: POService,
              private http: HttpClient) { }

  ngOnInit() {
    this.message.poBillNo.subscribe(data => {
      this.billNo = data;
      console.log(data);
      // this.login.getUser('Requestor').subscribe(req => {
      //   this.requestorDetails = req;
      //   this.http.get(environment.BASE_URL + 'department/deptDetails').subscribe((dept: any) => {
      //     this.deptDetails = dept;
      //    this.http.get(environment.BASE_URL + 'cities/locationDetails')
      //     .subscribe((loc: any) => {
      //     this.locDetails = loc;
      //     this.http.get<any>(environment.BASE_URL + 'brand/brandName').subscribe(brandDetails => {
      //       this.brandDetails = brandDetails;
          this.http.get(environment.BASE_URL + 'order/getStatus').subscribe((sta: any) => {
            this.statusDetails = sta;
            this.poService.getPoByBillNo(this.billNo).subscribe(poData => {
              console.log(poData);
              const actual = [];
             for (let i of poData) {
               actual.push({
                 ...i,
                 locationName: i.locationName,
                 departmentName: i.departmentName,
                 status: i.itemStatus,
                 brandName: i.brandName
               })
             }
             this.poDetails = actual;
             this.creator = this.poDetails[0].creator;
             this.Urgent = this.poDetails[0].urg_msg;
             this.totalAmount = this.poDetails[0].total;
             this.loc = this.poDetails[0].locationName,
             this.poStatus = this.poDetails[0].poStatus;
             console.log(this.poDetails);
             this.dataSource = new MatTableDataSource(this.poDetails);
           }, error => {
             console.log(error);});
            }, error9 => {
              console.log(error9);});
          }, error1 => {
           console.log(error1);});
  //       }, error2 => {
  //        console.log(error2);});
  //     }, error3 => {
  //      console.log(error3);});
  //   }, error4 => {
  //    console.log(error4);});
  //  }, error5 => {
  //    console.log(error5);});

    this.poService.getAttachmentsByBillNo(this.billNo).subscribe((data: any) => {
      console.log(data);
      this.imageNames = data;
      console.log(this.imageNames);
    });

    this.budgetService.getallbudget().subscribe((info: any) => {
       this.budgetDetails = info;
    })
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
      if(message) {
        let flag = 0;
        let budget: any[] = [];
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
                  let detail = this.poDetails.find(a => a.id === i.id);
                  let currentbudget = this.budgetDetails.findIndex(a => a.location === i.location && a.department === i.department);
                  console.log('CurrentBudget', currentbudget);
                  po.total = po.total - (detail.price * detail.quantity);
                  po.item.push({
                    id : i.id,
                    order_id : i.order_id,
                    status: this.statusDetails.find(j => j.orderStatus === 'PO Denied').id,
                  });
                  let index = budget.findIndex(b => b.location === i.location && b.department === i.department)
                  if (index >= 0) {
                    budget[index].budget = +budget[index].budget + (+i.price * +i.quantity);
                  } else {
                    budget.push({
                      location: i.location,
                      department: i.department,
                      budget: +this.budgetDetails[currentbudget].budget + (+i.price * +i.quantity)
                    })
                  }
                  console.log('Total Cost', po.total);
                  console.log('Budget', budget);
               }
            }
        } else {
          for (let i of this.poDetails) {
            po.item.push({
              id: i.id,
              order_id: i.order_id,
              status: this.statusDetails.find(j => j.orderStatus === 'PO Denied').id
            })
            let currentbudget = this.budgetDetails.findIndex(a => a.location === i.location && a.department === i.department);
            console.log('CurrentBudget', currentbudget);
            let index = budget.findIndex(b => b.location === i.location && b.department === i.department)
            if (index >= 0) {
              budget[index].budget = +budget[index].budget + (+i.price * +i.quantity);
            } else {
              budget.push({
                location: i.location,
                department: i.department,
                budget: +this.budgetDetails[currentbudget].budget + (+i.price * +i.quantity)
              })
            }
            console.log('Budget', budget);
          }
        }
          po.billNo = this.billNo;
          po.message = message;
          console.log(po);

          this.http.put(environment.BASE_URL + 'Purchase/update_po_status' , po).subscribe((data: any) =>{
          console.log(data);
          if (budget.length > 0) {
            for (let i of budget) {
              this.budgetService.updationofBudget(i.department, i.location, i.budget).subscribe(result => {
                console.log(result);
              }, err => {
                console.log(err);
              });
            }
          }
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

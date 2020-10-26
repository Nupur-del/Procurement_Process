import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { POService } from '../po.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-po',
  templateUrl: './view-po.component.html',
  styleUrls: ['./view-po.component.scss']
})
export class ViewPOComponent implements OnInit {
  sub: any;
  po: any;
  imageNames: any = [];
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private message: MessageService,
              private poService: POService,
              private http: HttpClient) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      reqName: ['', Validators.required],
      urg_msg: ['', Validators.required],
      attachments: ['', Validators.required],
      reason: ['', Validators.required],
      comment: ['', Validators.required],
      behalf: ['', Validators.required],
      purchase_type: ['', Validators.required],
      message: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      billno: ['', Validators.required],
      currency: ['', Validators.required],
      org_billed: ['', Validators.required],
      cmp_name: ['', Validators.required],
      location: ['', Validators.required],
      bill_to_address: ['', Validators.required],
      delivery_to: ['', Validators.required],
      required_by: ['', Validators.required],
      delivery_address: ['', Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
      cost_center: ['', Validators.required],
      project_code: ['', Validators.required],
      budget_code: ['', Validators.required],
    });

    this.fourthFormGroup = this._formBuilder.group({
      item_name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      total: ['', Validators.required],
    });


    this.message.currentMessage.subscribe(message => this.sub = message);

    this.poService.getPoByBillNo(this.sub).subscribe((data: any) => {
      console.log(data);
      this.po = data[0];
    });

    this.poService.getAttachmentsByBillNo(this.sub).subscribe((data: any) => {
      console.log(data);
      this.imageNames = data;
    });
  }

  onDecision(decision) {
    let po: any = {};
    po.status = decision;
    po.action = 'update';
    po.order_id = this.po.order_id;
    po.item_id = this.po.item_id;
    po.billNo = this.po.billNo;
    po.messgae = 'PO Accepted to Supplier';
    this.http.post(environment.BASE_URL + 'Purchase_order/update_po_status' , po).subscribe((data: any) =>{
      console.log(data);
      this.router.navigate(['/supplierHome']);
    }, err => {
    console.log(err);
    });
    }

}

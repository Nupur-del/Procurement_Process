import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import { DataService} from '../data.service';
import {
  MatSnackBar
} from '@angular/material';


@Component({
  selector: 'app-activation-supplier-account',
  templateUrl: './activation-supplier-account.component.html',
  styleUrls: ['./activation-supplier-account.component.scss']
})
export class ActivationSupplierAccountComponent implements OnInit {

  details: any;
  suppid: any;
  isSending = false;
  catergories = [];
  constructor(private login: LoginService,
              private data: DataService,
              private router: Router,
              private snack: MatSnackBar,
              private http: HttpClient) { }

  ngOnInit() {
    this.data.supplierID.subscribe(id => {
       this.suppid = id;
    })
    this.login.getdetails_byID(this.suppid)
    .subscribe(
      (data: any) => {
        this.details = data;
        console.log(this.details);
      })
    let sparams = new HttpParams().set('id', this.suppid);
    this.http.get(environment.BASE_URL + 'supplier/getCategories', {params: sparams})
    .subscribe((cate : any) => {
      for(let i of cate) {
        this.catergories.push(i.category);
      }
      console.log(this.catergories);
    })
  }

  decision(data) {
    this.isSending = true;
    this.login.updateSupplierDetails(this.suppid, data).subscribe(
      (data:any) => {
        console.log(data);
        this.isSending = false;
        this.snack.open('Notification has sent to Supplier through mail', '', {duration: 3000});
        this.router.navigate(['/requisitionHome']);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import { Subscription, timer } from 'rxjs';
import {AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  loginStatus: any;
  type: any;
  title = 'Requisition';
  isVerified = false;
  item = false;
  toggle = false;
  onmarked = false;
  suppDetails = [];
  notifiedCount = 0;
  notifySub: Subscription;
  onrequest = false;
  po = false;

  constructor(private loginService: LoginService,
              private router: Router,
              private http: HttpClient,
              private auth: AuthService) {}

  ngOnInit() {
    this.loginService.isLoggedIn.subscribe(status => {
      this.loginStatus = status;
    });

    this.loginService.getrows().subscribe((supp: any) => {
      if(supp.count > 0) {
        for(let i of supp.rows) {
          this.suppDetails.push(i.venVendorFK);
        }
        console.log(this.suppDetails);
      }
    });

    this.loginService.userType.subscribe(data => {
      this.type = data;
      if (this.type === 'Approver') {
        this.notifySub = timer(0, 300000).pipe(
          switchMap(() => this.loginService.getCount())
        ).subscribe(result => this.notifiedCount = result);
       }
    });

    if (this.loginStatus === true || this.loginStatus === 'true') {
      console.log(this.loginStatus);
      // this.auth.setLoggedIn(true);
      this.auth.setVerified(true);
      this.router.navigate(['/home']);
    } else if (localStorage.getItem('loginStatus') === 'true' && localStorage.getItem('type')) {
      // this.auth.setLoggedIn(true);
      this.auth.setVerified(true);
      console.log(this.loginStatus);
       this.loginStatus = localStorage.getItem('loginStatus');
       this.type = localStorage.getItem('type');
       if (this.type === 'Approver') {
        this.notifySub = timer(0, 300000).pipe(
          switchMap(() => this.loginService.getCount())
        ).subscribe(result => this.notifiedCount = result);
       }
       this.router.navigate(['/home']);
    } else if (localStorage.getItem('Verified') === 'No' || localStorage.getItem('Approved') === 'No') {
      this.auth.setLoggedIn(true);
      // this.auth.setVerified(true);
    }
    // else {
    //   this.router.navigate(['/login']);
    // }
  }

  logout() {
    this.onmarked = false;
    this.onrequest = false;
    this.toggle = false;
    this.item = false;
    this.po = false;
    this.loginService.logout();
  }

  ngOnDestroy() {
     if (this.notifySub) {
       this.notifySub.unsubscribe();
     }
  }

  view() {
    let viewData = {
      isviewed: true,
      id: this.suppDetails
    }
    this.http.put(environment.BASE_URL + 'supplier/updateView', viewData).subscribe(
      (data: any) => {
        console.log(data);
        this.notifiedCount = 0;
        this.router.navigate(['/SupplierApproval']);
      },
      (err) => {
        console.log(err);
      }
    )
  }

}

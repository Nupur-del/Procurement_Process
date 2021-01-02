import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loginStatus: any;
  type: any;
  title = 'Requisition';
  isVerified = false;

  constructor(private loginService: LoginService,
              private router: Router,
              private auth: AuthService) {}

  ngOnInit() {
    this.loginService.isLoggedIn.subscribe(status => {
      this.loginStatus = status;
    });
    this.loginService.userType.subscribe(data => {
      this.type = data;
    });
    if (this.loginStatus === true || this.loginStatus === 'true') {
      this.auth.setLoggedIn(true);
      this.router.navigate(['/home']);
    } else if (localStorage.getItem('loginStatus') === 'true' && localStorage.getItem('type')) {
      this.auth.setLoggedIn(true);
       this.loginStatus = localStorage.getItem('loginStatus');
       this.type = localStorage.getItem('type');
       this.router.navigate(['/home']);
    } else {
      // this.router.navigate(['/homePage']);
    }
  }

  logout() {
    this.loginService.logout();
  }
}

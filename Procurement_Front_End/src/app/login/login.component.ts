import { Component, OnInit, ViewChild,  } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {NgForm} from '@angular/forms';
import { LoginService, LoginCreds } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email = '';
  password: any;
  userid = null;
  @ViewChild('log', {static: false}) loginForm: NgForm;
  type: any;
  selected: string;
  accountType = [
    'Requestor',
    'Supplier',
    'Approver'
  ];

  constructor(private Auth: AuthService,
              private router: Router,
              private loginService: LoginService,
              private snack: MatSnackBar) { }

  ngOnInit() {
    this.loginService.userType.subscribe(u => this.type = u);
    this.type = localStorage.getItem('type');
  }

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;
    this.Auth.getUserDetails(username, password).subscribe(data => {
      if (data.success) {
        this.router.navigate(['/home']);
        this.Auth.setLoggedIn(true);
      } else {
        this.snack.open(data.message, '', {duration: 3000});
      }
    });
  }

  login() {
    const authCred: LoginCreds = {
      email: this.email,
      password: this.password,
      user_type: this.selected,
      userId: this.userid
    };
    console.log(authCred);
    if (this.selected !== 'Supplier') {
            this.loginService.login(authCred).subscribe((data: any) => {
              console.log(data);
              if (data) {
                  this.type = data.type;
                  this.loginService.userType.next(data.type);
                  this.loginService.userId.next(data.id);
                  // this.loginstatus = true;
                  this.loginService.isLoggedIn.next(true);
                  // this.auth.setLoggedIn(true);
                  this.Auth.setVerified(true);
              }
              // tslint:disable-next-line: no-string-literal
              localStorage.setItem('type', data.type);
              const status = 'true';
              localStorage.setItem('loginStatus', status);
              localStorage.setItem('username', data.name);
              localStorage.setItem('email', data.email);
              localStorage.setItem('userId', data.id);
              // tslint:disable-next-line: no-string-literal
              this.router.navigate(['/home']);
        }, error => {
              console.log(error);
              alert(error.error.message);
              // this.loginstatus = false;
              this.loginService.userType.next('');
              this.type = '';
              this.loginService.isLoggedIn.next(false);
              // this.auth.setLoggedIn(false);
              this.Auth.setVerified(false);
            });
    } else {

      this.loginService.login(authCred).subscribe(
        (data: any) => {
         console.log(data);
         if (!data.message) {

               this.type = data.type;
               this.loginService.userType.next(data.type);
              //  this.loginstatus = true;
               this.loginService.isLoggedIn.next(true);
               // this.auth.setLoggedIn(true);
               // tslint:disable-next-line: no-string-literal
               localStorage.setItem('type', data.type);
               const status = 'true';
               localStorage.setItem('loginStatus', status);
               localStorage.setItem('username', data.name);
               localStorage.setItem('email', this.email);
               localStorage.setItem('password', this.password);
               localStorage.setItem('userId', data.id);
               this.Auth.setVerified(true);
               this.snack.open('Logined Successfully', '', {duration: 3000});
               // tslint:disable-next-line: no-string-literal
               this.router.navigate(['/home']);

         } else {

           if (data.message.includes('Email is yet not verified')) {
             this.Auth.setLoggedIn(true);
             localStorage.setItem('Verified', 'No');
             this.router.navigate(['/resendEmail']);
           } else if (data.message.includes('Account is not yet approved')) {
             this.Auth.setLoggedIn(true);
             localStorage.setItem('Approved', 'No');
             this.router.navigate(['/notApproved']);
           }
          }
        }, error => {
           console.log(error);
           if(error.error.message) {
             alert(error.error.message);
           } else {
             alert(error.error);
           }
          //  this.loginstatus = false;
           this.loginService.userType.next('');
           this.type = '';
           // this.auth.setLoggedIn(false);
           this.Auth.setVerified(false);
           this.loginService.isLoggedIn.next(false);
        });
    }
  }

}

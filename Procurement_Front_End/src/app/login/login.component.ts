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
        this.router.navigate(['admin']);
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
    this.loginService.login(authCred);
  }

  resendEmail(email) {
    if (email !== '') {
      this.loginService.resendEmail(email).subscribe((data: any) => {
        console.log(data);
        this.snack.open(data.message, '', {duration: 3000});
      })
    } else {
      this.snack.open('Please enter the email', '', {duration: 3000});
    }
  }

}

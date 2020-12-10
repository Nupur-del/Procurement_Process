import { Component, OnInit, ViewChild,  } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { LoginService, LoginCreds } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email: any;
  password: any;
  @ViewChild('log', {static: false}) loginForm: NgForm;
  type: any;
  selected: string;
  accountType = [
    'Requestor',
    'Supplier',
    'Approver'
  ];

  constructor(private Auth: AuthService, private router: Router,
              private loginService: LoginService) { }

  ngOnInit() {}

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
        window.alert(data.message);
      }
    });
  }


  login() {
    const authCred: LoginCreds = {
      email: this.email,
      password: this.password,
      user_type: this.selected
    };
    console.log(authCred);
    this.loginService.login(authCred);
  }

}

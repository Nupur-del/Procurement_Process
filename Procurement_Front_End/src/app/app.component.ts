import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  loginStatus: any;
  type: any;


  constructor(private loginService: LoginService,
              private router: Router)
  {

  }

  ngOnInit() {
    if(localStorage.getItem('type') && localStorage.getItem('loginStatus'))
    {
    this.type = localStorage.getItem('type');
    this.loginStatus =  localStorage.getItem('looginStatus');
    console.log(this.type);
    this.router.navigate(['/home']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  title = 'Requisition';

  logout() {
    this.loginService.logout();
  }

}

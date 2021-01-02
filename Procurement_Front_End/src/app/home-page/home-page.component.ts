import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  selected: any;
  userType = ['Requestor', 'Approver', 'Supplier'];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/login']);
  }
   signUp() {
     this.router.navigate(['/supplierRegistration']);
   }
}

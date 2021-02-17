import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-not-approved',
  templateUrl: './not-approved.component.html',
  styleUrls: ['./not-approved.component.scss']
})
export class NotApprovedComponent implements OnInit {

  constructor(private loc: Location,
             private loginService: LoginService) { }

  ngOnInit() {
  }

  signOut() {
    this.loginService.logout();
}

}

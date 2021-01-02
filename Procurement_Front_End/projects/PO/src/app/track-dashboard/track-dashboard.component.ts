import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-track-dashboard',
  templateUrl: './track-dashboard.component.html',
  styleUrls: ['./track-dashboard.component.scss']
})
export class TrackDashboardComponent implements OnInit {

  billNo: any;
  constructor(private message: MessageService,
              private router: Router) {}

  ngOnInit() {}

  track() {
    this.message.changeBillNo(this.billNo);
    this.router.navigate(['/track-order']);
  }
}

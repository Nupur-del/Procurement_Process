import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../src/app/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-track-dashboard',
  templateUrl: './track-dashboard.component.html',
  styleUrls: ['./track-dashboard.component.scss']
})
export class TrackDashboardComponent implements OnInit {

  sub: any;
  orderId: any;
  constructor(private data: DataService,
              private router: Router) {}

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.sub = message);
  }

  track() {
    this.sub = this.orderId;
    this.data.changeMessage(this.sub);
    this.router.navigate(['/track-order']);
  }
}

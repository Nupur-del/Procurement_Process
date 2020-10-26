import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../../src/app/data.service';
import { ItemService } from '../../../../../src/app/item.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MessageService } from '../message.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {
  sub2: any;
  sub: any;
  items: any;
  error = false;
  message = '';

  constructor(private data: DataService,
              private itemService: ItemService,
              private messageService: MessageService,
              private activate: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.sub = message);
    this.messageService.currentMessage.subscribe(message => this.sub2 = message);

    this.itemService.trackItems(this.sub).subscribe((data: any) => {
      if (!data || data.length === 0) {
        this.error = true;
        this.message = 'Please check the order id, Purchase Order has not received';
      }
      this.items = data;
      console.log(this.items);
    });
  }

  getInvoice (item_id) {
    console.log(item_id);
    this.sub2 = item_id;
    this.messageService.changeMessage(this.sub2);
    this.router.navigate(['/invoiceView']);
  }

  onBack() {
    this.router.navigate(['../'], {relativeTo: this.activate});
  }

}

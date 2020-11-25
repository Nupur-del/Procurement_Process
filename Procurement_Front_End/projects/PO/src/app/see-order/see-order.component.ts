import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../../../src/app/item.service';
import { OrderService } from '../../../../../src/app/order.service';
import { LocationService } from '../../../../../src/app/location.service';
import { MessageService } from '../message.service';
import { DataService } from '../data.service';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-see-order',
  templateUrl: './see-order.component.html',
  styleUrls: ['./see-order.component.scss']
})

export class SeeOrderComponent implements OnInit {

  dataSource: any;
  sub2: any;
  sub: any;
  item: any;
  public orderList: any = [ ];
  public locationList: any = [ ];
  public itemList: any = [ ];
  closeResult: string;
  isShow = true;
  new = true;
  catalogDisplay = true;
  decision: any;
  change = true;
  toggleSelected = true;
  option: string;
  interval: any;
  order: any = {};
  public multiLocs: any = [ ];
  public finalItem: any = [ ];
  displayedColumns: string[] = ['Item ID', 'Name', 'Specification', 'Vendor', 'Quantity', 'Price', 'location', 'department'];

  constructor(private orderService: OrderService,
              private itemService: ItemService,
              private locationService: LocationService,
              private message: MessageService,
              private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => this.sub2 = message);
    this.message.currentMessage.subscribe(message => this.sub = message);
    console.log(this.sub);
    this.orderService.getOrderById(this.sub).subscribe((data: any) => {
      this.order = data[0];
      console.log(data);
    });


    console.log(this.sub);
    this.orderService.getStatusById(this.sub).subscribe((data: any) =>  {
      this.order.status = data.status;
      this.order.message = data.message;
    });

    this.itemService.getItemById(this.sub).subscribe((data) => {
      this.itemList = data;
      console.log('item data-', data);
      for (const item of this.itemList) {
        this.finalItem.push(item);
      }
      console.log('FinalItem', this.finalItem);
      if (this.sub2 === '0') {
        this.dataSource = new MatTableDataSource(this.finalItem);
      } else {
      this.item = this.finalItem.filter(item => item.id === this.sub2);
      console.log(this.item);
      this.dataSource = new MatTableDataSource(this.item);
      }
    });

    this.locationService.getLocationById(this.sub).subscribe((data) => {
      this.locationList = data;
      console.log('location data-', data);
      for (const location of this.locationList) {
        this.multiLocs.push(location);
      }
    });
  }
}

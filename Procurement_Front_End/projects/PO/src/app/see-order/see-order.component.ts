import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../../../src/app/item.service';
import { OrderService } from '../../../../../src/app/order.service';
import { LocationService } from '../../../../../src/app/location.service';
import { MessageService } from '../message.service';
import { DataService } from '../data.service';
import { MatTableDataSource } from '@angular/material';
import {environment} from '../../../../../src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { LoginService } from 'src/app/login.service';

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
  locDetails = [];
  deptDetails = [];
  supplierDetails = [{
    name: '',
    id: null
  }];
  brandDetails = [{
    brandName: '',
    brandpk: null
  }];
  public orderList: any = [ ];
  public locationList: any = [ ];
  public itemList: any = [ ];
  closeResult: string;
  requestorDetails = [];
  isShow = true;
  new = true;
  catalogDisplay = true;
  decision: any;
  change = true;
  toggleSelected = true;
  option: string;
  interval: any;
  order: any;
  public multiLocs: any = [ ];
  public finalItem: any = [ ];
  displayedColumns: string[] = ['Item ID', 'Name', 'Specification', 'Vendor', 'Quantity', 'Price', 'location', 'department', 'status'];

  constructor(private orderService: OrderService,
              private itemService: ItemService,
              private login: LoginService,
              private http: HttpClient,
              private locationService: LocationService,
              private message: MessageService,
              private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => this.sub2 = message);
    this.message.currentMessage.subscribe(message => this.sub = message);
    console.log(this.sub);
    // this.http.get(environment.BASE_URL + 'cities/locationDetails')
    // .subscribe((loc: any) => {
    //   this.locDetails = loc;
    //   this.http.get(environment.BASE_URL + 'department/deptDetails')
    //   .subscribe((dept: any) => {
    //     this.deptDetails = dept;
    //     this.login.getSupplier().subscribe(supp => {
    //       this.supplierDetails = supp;
    //       this.http.get(environment.BASE_URL + 'order/getStatus')
    //       .subscribe((status: any) => {
          this.itemService.getItemById(this.sub).subscribe((pro) => {
            this.itemList = pro;
            console.log('item data-', pro);
            for (const item of this.itemList) {
              this.finalItem.push({
                id: item.id,
                name: item.name,
                specification: item.specification,
                prefered_vendor: item.prefered_vendor,
                quantity: item.quantity,
                unit_type: item.unit_type,
                status: item.orderStatus,
                locationName: item.locationName,
                departmentName: item.departmentName,
                supplierName: item.supplierName,
                location: item.location,
                department: item.department,
                price: item.price,
                currency: item.currency,
                comment: item.comment,
                brand: item.brand
              });
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
    //      });
    //     });
    //   }, err => {
    //     console.log(err);
    //   });
    // }, err => {
    //   console.log(err);
    // });
    this.login.getUser('Requestor').subscribe(user => {
      this.requestorDetails = user;
      this.orderService.getOrderById(this.sub).subscribe((data: any) => {
        this.order = data;
        console.log(data);
      });
    }, err => {
      console.log(err);
    });
  }
}

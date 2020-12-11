import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {LoginService} from '../../../../../src/app/login.service';
import { ItemService } from '../../../../../src/app/item.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import {MatPaginator} from '@angular/material/paginator';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-po',
  templateUrl: './create-po.component.html',
  styleUrls: ['./create-po.component.scss']
})
export class CreatePOComponent implements OnInit {

  dataSource: any;
  itemList: any = [];
  sub: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  sub2: any;
  type: any;
  userID: number;
  supplierDetails = [];
  displayedColumns: string[] = ['Order ID',
  'Item ID', 'Name', 'Specification', 'Vendor', 'Quantity', 'Price' , 'Create'];

  constructor(private itemService: ItemService,
              private router: Router,
              private login: LoginService,
              private message: MessageService,
              private dataService: DataService) { }

  ngOnInit() {
    this.type = localStorage.getItem('type');
    this.userID = +localStorage.getItem('userId');

    const status = 'Approved';

    this.login.getSupplier().subscribe(supp => {
      this.supplierDetails = supp;
      this.itemService.getItemByStatus(status, this.userID).subscribe((item: any) => {
        console.log(item);
        const tableData = [];
        for (let i of item) {
          tableData.push({
            supplier: this.supplierDetails.find(w => w.id === i.prefered_vendor).name,
            ...i
          });
        }
        this.dataSource = new MatTableDataSource(tableData);
        this.dataSource.paginator = this.paginator;
        this.itemList.push(tableData);
      });
  });

    this.message.currentMessage.subscribe(message => this.sub = message);
    this.dataService.currentMessage.subscribe(message => this.sub2 = message);
  }

  onSelect(item_id) {
    console.log(item_id);
    this.sub = item_id;
    this.message.changeMessage(this.sub);
    this.dataService.changeMessage(this.sub);
    this.router.navigate(['/purchase-order']);
  }
}

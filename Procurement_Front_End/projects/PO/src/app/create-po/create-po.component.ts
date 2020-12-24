import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {environment} from '../../../../../src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../../../../../src/app/login.service';
import { ItemService } from '../../../../../src/app/item.service';
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import { MessageService } from '../message.service';
import {MatSnackBar} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { DataService } from '../data.service';

interface TableData {
  order_id: number,
  item_id: number,
  name: string,
  specification: string,
  vendor: string,
  quantity: number,
  price: number
}

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
  selection = new SelectionModel<any>(true, []);
  userID: number;
  supplierDetails = [];
  displayedColumns: string[] = ['select', 'Order ID',
  'Item ID', 'Name', 'Specification', 'Vendor', 'Location', 'Department', 'Quantity', 'Price'];
  locDetails = [];
  deptDetails = [];
  brandDetails = [];

  constructor(private itemService: ItemService,
              private snackBar: MatSnackBar,
              private router: Router,
              private http: HttpClient,
              private login: LoginService,
              private message: MessageService,
              private dataService: DataService) { }

  ngOnInit() {
    this.type = localStorage.getItem('type');
    this.userID = +localStorage.getItem('userId');

    this.http.get(environment.BASE_URL + 'cities/locationDetails')
    .subscribe((data: any) => {
      this.locDetails = data;
    }, err => {
      console.log(err);
    });

    this.http.get<any>(environment.BASE_URL + 'brand/brandName').subscribe(brandDetails => {
       this.brandDetails = brandDetails;
    }, err => {
      console.log(err);
    });

    this.http.get(environment.BASE_URL + 'department/deptDetails')
    .subscribe((data: any) => {
      this.deptDetails = data;
    }, err => {
      console.log(err);
    });

    const status = 'Approved';

    this.login.getSupplier().subscribe(supp => {
      this.supplierDetails = supp;
      this.itemService.getItemByStatus(status, this.userID).subscribe((item: any) => {
        console.log(item);
        const tableData = [];
        for (let i of item) {
          tableData.push({
            supplier: this.supplierDetails.find(w => w.id === i.prefered_vendor).name,
            locationName: this.locDetails.find(c => c.locLocationPK === i.location).locName,
            departmentName: this.deptDetails.find(b => b.id === i.department).department_name,
            brandName: this.brandDetails.find(v => v.brandpk === i.brand).brandName,
            ...i
          });
        }
        this.dataSource = new MatTableDataSource<any>(tableData);
        this.dataSource.paginator = this.paginator;
        // this.selection = new SelectionModel<any>(true, []);
        this.itemList.push(tableData);
      });
  });

    // this.message.currentMessage.subscribe(message => this.sub = message);
    // this.dataService.currentMessage.subscribe(message => this.sub2 = message);
  }

  onSelect(selectedData) {
    console.log(selectedData);
    const exists = selectedData.every(a => a.supplier === selectedData[0].supplier);
    const locexists = selectedData.every(b => b.location === selectedData[0].location);
    if (exists && locexists) {
       this.message.passData(selectedData);
       this.router.navigate(['/purchase-order']);
    } else {
      this.snackBar.open('Please select items of same vendor and location', '', {duration: 2000});
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}

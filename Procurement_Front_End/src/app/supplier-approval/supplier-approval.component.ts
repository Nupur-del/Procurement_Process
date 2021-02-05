import { Component, OnInit, ViewChild } from '@angular/core';
import {LoginService} from '../login.service';
import {MatPaginator} from '@angular/material/paginator';
import {DataService} from '../data.service';
import {Router} from '@angular/router';
import {
  MatTableDataSource,
  Sort
} from '@angular/material';

@Component({
  selector: 'app-supplier-approval',
  templateUrl: './supplier-approval.component.html',
  styleUrls: ['./supplier-approval.component.scss']
})

export class SupplierApprovalComponent implements OnInit {

  details: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns = ['name', 'company','email', 'mobile', 'Country', 'emailVerified', 'Action'] ;
  dataSource: any;

  constructor(private login: LoginService,
              private data: DataService,
              private router: Router) { }

  ngOnInit() {
    this.login.getNotified().subscribe((supp:any) => {
      this.details = supp.rows;
      this.dataSource = new MatTableDataSource(this.details);
      this.dataSource.paginator = this.paginator;
      console.log(this.details);
    })
  }

  sortOrder(sort: Sort) {
    const data = this.details.slice();
    if (!sort.active || sort.direction === '') {
        this.dataSource = data;
        return;
    }
    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
          case 'name': return this.compare(a.name, b.name, isAsc);
          default: return 0;
      }
    });
  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  activate(id) {
    this.data.fetchId(id);
    this.router.navigate(['/activateAccount']);
  }
}

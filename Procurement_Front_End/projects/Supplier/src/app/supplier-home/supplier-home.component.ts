import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { POService } from '../../../../PO/src/app/po.service';
import { ItemService } from '../item.service';
import { environment} from '../../../../../src/environments/environment';

@Component({
  selector: 'app-supplier-home',
  templateUrl: './supplier-home.component.html',
  styleUrls: ['./supplier-home.component.scss']
})
export class SupplierHomeComponent implements OnInit {

  po: any = {};
  userID: number;
  type: any;
  statusDetatils = [];
  item: any = {};
  constructor(private poService: POService,
              private http: HttpClient,
              private itemService: ItemService) { }

  ngOnInit() {

    this.type = localStorage.getItem('type');
    this.userID = +localStorage.getItem('userId');

    this.http.get(environment.BASE_URL + 'order/getStatus')
    .subscribe((data: any) => {
      this.statusDetatils = data;
      const status = this.statusDetatils.find(a => a.orderStatus === 'Pending').id;
      const denied = this.statusDetatils.find(b => b.orderStatus === 'PO Denied').id;
      this.poService.getStatusPOCount(status, this.type, this.userID).subscribe((data: any) => {
        this.po.pending = data.data;
      this.poService.getStatusPOCount(denied, this.type,this.userID).subscribe((data: any) => {
          this.po.denied = data.data;
        });
      });
    }, err => {
      console.log(err);
    });

    this.itemService.getItemCount(this.userID).subscribe((data: any) => {
      this.item.all = data.count;
    });

    this.poService.getInprogressPoCount(this.type, this.userID).subscribe((data: any) => {
      this.po.approved = data.data;
    });
  }

}

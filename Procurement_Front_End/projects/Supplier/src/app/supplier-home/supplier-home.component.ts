import { Component, OnInit } from '@angular/core';
import { POService } from '../../../../PO/src/app/po.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-supplier-home',
  templateUrl: './supplier-home.component.html',
  styleUrls: ['./supplier-home.component.scss']
})
export class SupplierHomeComponent implements OnInit {

  po: any = {};
  item: any = {};
  constructor(private poService: POService,
              private itemService: ItemService) { }


  ngOnInit() {

    this.itemService.getItemCount().subscribe((data: any) => {
      this.item.all = data.count;
    });

    this.poService.getStatusPOCount('Pending').subscribe((data: any) => {
      this.po.pending = data.data;
    });

    this.poService.getInprogressPoCount().subscribe((data: any) => {
      this.po.approved = data.data;
    });
  }

}

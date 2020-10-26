import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../../../src/app/item.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

}

import { Injectable } from '@angular/core';
import { ItemService } from './item.service';
import { Resolve } from '@angular/router';
import { DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class EditResolverService implements Resolve<any>{

  // serviceImage: any;
  // imageLength: any;
  // imageList: any = [];

  item: any = [];
  sub: any;
  constructor(private itemService: ItemService,
              private dataService: DataService) { }

  resolve() {
    this.dataService.currentMessage.subscribe(message => this.sub = message);

    this.itemService.getItemById(this.sub).subscribe((data) => {
      this.item.push(data);
      console.log(data);
    });
    return this.item;
  }
}

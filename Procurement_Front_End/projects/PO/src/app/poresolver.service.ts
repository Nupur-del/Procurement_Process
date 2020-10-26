import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MessageService } from './message.service';
import { ItemService } from '../../../../src/app/item.service';

@Injectable({
  providedIn: 'root'
})
export class POResolverService implements Resolve<any>{
  sub: any;
  item: any = [];

  constructor(private message: MessageService,
              private itemService: ItemService) { }


  resolve()
  {
    this.message.currentMessage.subscribe(message => this.sub = message);
    // this.imageService.getImageById(this.sub).subscribe((data) => {
    //   this.imageLength = data.length;
    //   this.serviceImage = data;
    //   console.log(data);
    // });
    // for(let i = 0 ; i < this.imageLength ; i++ )
    // {
    // this.imageList.push(this.serviceImage[i].imageName);
    // }
    // this.item.push(this.imageList);
    this.itemService.getItemByItemId(this.sub).subscribe((data) => {
      this.item.push(data);
      console.log(data);
    });
    return this.item;
  }
}

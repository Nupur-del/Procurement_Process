import { Injectable } from '@angular/core';
import { ItemService } from './item.service';
import { ImageService } from './image.service';
import { Resolve } from '@angular/router';
import { DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class EditResolverService implements Resolve<any>{

  // serviceImage: any;
  // imageLength: any;
  // imageList: any = [];

  itemImages: any = [];

  item: any = [];


  sub: any;

  constructor(private itemService: ItemService,
              private dataService: DataService,
              private imageService: ImageService) { }

  resolve()
  {
    this.dataService.currentMessage.subscribe(message => this.sub = message);
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
    this.imageService.getImageById(this.sub).subscribe((data) => {
      this.itemImages.push(data);
      console.log(data);
    });
    this.itemService.getItemById(this.sub).subscribe((data) => {
      this.item.push(data);
      console.log(data);
    });
    return this.item;
  }
}

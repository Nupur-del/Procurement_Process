import { Injectable } from '@angular/core';
import { ItemService } from './item.service';
import { ImageService } from './image.service';
import { Resolve } from '@angular/router';
import { MoveService } from './move.service';

@Injectable({
  providedIn: 'root'
})
export class ItemResolverService implements Resolve<any> {

  item: any;

  constructor(private itemService: ItemService,
              private imageService: ImageService,
              private moveService: MoveService) { }


  resolve()
  {
    this.itemService.getAllItems();
    this.imageService.getAllImages();
  }
}

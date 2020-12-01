import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { MatTableDataSource } from '@angular/material';
import {ItemService} from '../item.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import {ImageService} from '../image.service';

interface ItemsModel {
  item_id: number;
  name: string;
  brand: string;
  price: number;
  warranty: string;
  images: string[];
}

interface ImageSlider {
  image: string;
  thumbImage: string;
  alt: string;
  title: string;
}

@Component({
  selector: 'app-see-item',
  templateUrl: './see-item.component.html',
  styleUrls: ['./see-item.component.scss']
})

export class SeeItemComponent implements OnInit {

  displayedColumns: string[] = ['Item ID', 'Name', 'Brand', 'Price', 'Warranty'];
  itemId: any;
  images: any[] = [];
  items: Array<ItemsModel> = [];
  dataSource: any;
  isLoading = false;
  itemImages: Array<ImageSlider>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private dataService: DataService,
              public snackBar: MatSnackBar,
              private itemService: ItemService,
              private imageService: ImageService) {}

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => this.itemId = message);
    this.isLoading = true;
    this.itemImages = [{
      image: 'http://localhost:3000/images/dummy_image.jpg',
      thumbImage: 'http://localhost:3000/images/dummy_image.jpg',
      alt: 'dummy',
      title: 'Appliances'
    }];
    this.itemService.getItemById(this.itemId).subscribe((data: any) => {
      console.log(data);
      this.items.push(data);
      console.log(this.items);
      this.imageService.getImageById(this.itemId).subscribe((data: Array<any>) => {
        console.log(data);
        if (data.length > 0) {
        for (const i of data) {
        this.itemImages.push({
          image: 'http://localhost:3000/images/' + i.imageName,
          thumbImage: 'http://localhost:3000/images/' + i.imageName,
          alt: 'alt of image',
          title: 'USB CABLE'
        });
        this.isLoading = false;
        }
     } else {
       this.snackBar.open('No Images are available for this Product', '', {duration: 2000});
       this.isLoading = false;
     }
        console.log(this.itemImages);
      }, err => {
        console.log(err);
      });
      this.dataSource = new MatTableDataSource(this.items);
    }, err => {
      console.log(err);
    });
  }
}

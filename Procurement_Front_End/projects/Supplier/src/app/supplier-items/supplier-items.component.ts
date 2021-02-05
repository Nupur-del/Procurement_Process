import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ItemService } from '../item.service';
import { ImageService } from '../image.service';
import { DataService } from '../data.service';
import { Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../src/environments/environment';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CSVComponent } from '../csv/csv.component';
import { EditItemComponent } from '../edit-item/edit-item.component';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { SeeItemComponent } from '../see-item/see-item.component';

@Component({
  selector: 'app-supplier-items',
  templateUrl: './supplier-items.component.html',
  styleUrls: ['./supplier-items.component.scss']
})
export class SupplierItemsComponent implements OnInit {
  resolverItem: any[] = [];
  sub: any;
  item: any = {};
  images: any;
  imageList: any = [];
  itemList: any = [];
  dataSource: any;
  uploadedImages: any = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  message: string;
  actionButtonLabel = ':)';
  action = true;
  userID: number;
  type: any;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  addExtraClass = false;
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['Item ID', 'Name', 'SKU', 'Brand', 'Price', 'Currency', 'Features', 'DiscountRate', 'Warranty', 'ReplacementPolicy', 'Location', 'Images', 'edit', 'delete', 'replicate'];

  constructor(private itemService: ItemService,
              public snackBar: MatSnackBar,
              private imageService: ImageService,
              private data: DataService,
              private router: Router,
              private http: HttpClient,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.imageList = [];
    this.itemList = [];
    this.type = localStorage.getItem('type');
    this.userID = +localStorage.getItem('userId');

    this.itemService.getItems(this.userID).subscribe(item => {
      this.http.get<any>(environment.BASE_URL + 'brand/brandName').subscribe(brandDetails => {
        for (let i of item) {
          this.itemList.push({
            ...i,
            discountRate: +i.discount,
            brandName: brandDetails.find(a => a.brandpk === i.brand).brandName
          })
        }
        this.dataSource = new MatTableDataSource(this.itemList);
        this.dataSource.paginator = this.paginator;
        console.log(this.itemList);
        console.log(this.item);
        for (let i of item) {
          this.imageService.getImageById(i.item_id).subscribe(imag => {
            this.imageList.push(imag);
          });
        }
        console.log(this.imageList);
      });
    });

    this.data.currentMessage.subscribe(message => this.sub = message);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      this.ngOnInit();
      refresher.target.complete();
    }, 2000);
  }

  doLoad() {
    window.location.reload();
  }

  insert() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }

  getData() {
    this.itemService.getItems(this.userID).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  onReplicate(item_id: string, refresher) {
    console.log(this.itemList);
    // this.itemList = this.itemList["0"];
    console.log(this.itemList);

    this.item = this.itemList.filter(item => item.item_id === item_id);
    this.item = this.item[0];
    this.item.action = 'replicate';
    console.log(this.item);
    console.log(this.imageList);
    // this.imageList = this.imageList["0"];

    if (this.imageList.length > 0) {
      for (let image of this.imageList) {
        console.log(image);
        if ( image.length > 0) {
          let k = image.filter(a => a.item_id === item_id);
          if (k.length > 0) {
            for (let j of k) {
              this.uploadedImages.push(j.imageName);
            }
          }
        }
    }
    console.log('UploadImage3', this.uploadedImages);
    this.item.imageName = this.uploadedImages;
    } else {
     this.item.imageName = [];
   }
   console.log('UploadImage', this.uploadedImages);

    console.log('Replicated Item ',this.item);
    this.itemService.replicateItem(this.item).subscribe(data => {
      console.log('Replicated Items', data);
      this.message = 'Replication of item Succeeded';
      this.insert();
      this.doRefresh(refresher);
      }, err => {
      console.log(err);
     });
  }

  onDelete(item_id: any, refresher) {
    console.log(item_id);
    this.itemService.delItem(item_id).subscribe(data => {
      this.message = 'Deleted Sucessfully';
      console.log(data);
      this.insert();
      this.doRefresh(refresher);
    }, err => {
      console.log(err);
    });
  }

  onEdit(item_id: any, refresher) {
    this.sub = item_id;
    this.data.changeMessage(this.sub);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.maxHeight = '90vh';
    const dialog = this.dialog.open(EditItemComponent, dialogConfig);

    dialog.afterClosed().subscribe(() => {
      this.doRefresh(refresher);
  });
  }

  addCSV(refresher) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    const dialog = this.dialog.open(CSVComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      // Do stuff after the dialog has closed
      this.doRefresh(refresher);
    });
  }

  seeImages(id: any, refresher) {
    this.data.changeMessage(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.maxHeight = '90vh';
    const dialog = this.dialog.open(SeeItemComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      // Do stuff after the dialog has closed
      this.doRefresh(refresher);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../src/environments/environment';
import { ItemService } from '../item.service';
import { ImageService } from '../image.service';
import { DataService } from '../data.service';
import { MatDialogRef } from '@angular/material';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { EditComponent } from 'src/app/edit/edit.component';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})

export class EditItemComponent implements OnInit {

  request: any = {};
  serviceItem: any;
  serviceImage: any;
  imageLength: any = [];
  sampleMan: any = [];
  imageList: any = [];
  sub: any;
  isRemovable = true;
  item = {
    brand: '',
    currency: '',
    desc: '',
    discount: null,
    features: '',
    item_id: null,
    location: '',
    name: '',
    policy: '',
    price: null,
    quantity: null,
    sku: '',
    threshold: null,
    warranty: '',
    imageName: []
  };
  myFiles:any [] = [];
  imageNames:any[] = [];
  uploadedImages: any = [];
  image: any;
  change:boolean = false;
  optional:boolean = false;
  requireChange:boolean = true;
  fName: any;
  fType: any;
  message: string;
  actionButtonLabel = ':)';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  addExtraClass = false;

  constructor(private http: HttpClient,
              private router: Router,
              public snackBar: MatSnackBar,
              private itemService: ItemService,
              private imageService: ImageService,
              private data: DataService,
              private dialogRef: MatDialogRef<EditComponent>) {
               }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.sub = message);
    this.itemService.getItemById(this.sub).subscribe((data: any) => {
      this.item = data;
      console.log('Item', this.item);
    });

    this.imageService.getImageById(this.sub).subscribe((data) => {
      this.serviceImage = data;
      console.log(data);
      if (data.length !== 0) {
        for (let i = 0 ; i < data.length ; i++ ) {
          this.imageNames.push(this.serviceImage[i].imageName);
        }
      }
    });
  }

  insert() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }

  onFileChange(event) {
    // tslint:disable-next-line: prefer-for-of
    for (var i = 0; i < event.target.files.length; i++) {
      const name = event.target.files[i].name;
      let sample = String(name);
      this.myFiles.push(event.target.files[i]);
      this.imageNames.push(sample);
    }
    console.log(this.myFiles);
    this.imageNames = this.removeDuplicates(this.imageNames);
    console.log(this.imageNames);
    this.change = false;
  }


  onUpload() {
    let formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append('file', this.myFiles[i]);
    }
    this.http.post(environment.BASE_URL + 'api/upload', formData)
    .subscribe(
      (success) => {
              console.log(success);
              for( let i of success['file']) {
                  this.uploadedImages.push(i.filename);
                  console.log(this.uploadedImages);
              }
              alert('Uploaded Successfully.');
              this.isRemovable = false;
       },
      (error) => {
                console.log(error);
                alert(error);
            });
  }

  removeImage(i: number) {
    console.log(this.uploadedImages[i]);
    let params = new HttpParams().set('fileName', this.uploadedImages[i]);
    this.http.delete(environment.BASE_URL + 'api/deleteFile', { params: params }).subscribe( data => {
      alert(data['message']);
      console.log(data);
      this.uploadedImages.splice(i, 1);
      this.imageNames.splice(i, 1);
      this.myFiles.splice(i, 1);
      console.log(this.imageNames);
      console.log(this.uploadedImages);
      }, err => {
        JSON.parse(JSON.stringify(err));
      });
  }

  onReset() {
    this.image = null;
    alert('Please select new file');
  }

  removeDuplicates(arr) {
    var newarr = (function(arr){
      var m = {}, newarr = []
      for (var i=0; i<arr.length; i++) {
        var v = arr[i];
        if (!m[v]) {
          newarr.push(v);
          m[v] = true;
        }
      }
      return newarr;
    })(arr);

    return newarr;
  }

  disableFields() {
    this.optional = !this.optional;
    this.requireChange = !this.requireChange;
    this.fName = null;
    this.fType = null;
  }

  editItem() {
    this.item.imageName = this.uploadedImages;
    this.request.item_id = this.item.item_id;
    console.log(this.request);
    console.log('Items', this.item);
    // let deletionItem = this.itemService.delItem(this.request.item_id);
    // if (!deletionItem || deletionItem.length === 0) {
    this.message = 'Edited Sucessfully';
    this.insert();
    this.itemService.editItem(this.item);
    //  if (!EditItem || EditItem.length === 0) {
    this.dialogRef.close();
    //   }
    // }
  }
}

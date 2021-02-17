import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../src/environments/environment';
import { ItemService } from '../item.service';
import { ImageService } from '../image.service';
import { DataService } from '../data.service';
import { MatDialogRef } from '@angular/material';
import {Observable} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {startWith, map} from 'rxjs/operators';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { EditComponent } from 'src/app/edit/edit.component';


interface ImageSlider {
  image: string;
  thumbImage: string;
  alt: string;
  title: string;
}

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})

export class EditItemComponent implements OnInit {

  // Arrays

  brandNames = [];
  serviceImage: any;
  imageLength: any = [];
  sampleMan: any = [];
  imageList: any = [];
  itemImages: Array<ImageSlider> = [];
  myFiles:any [] = [];
  brandDetails = [];
  imageNames:any[] = [];
  uploadedImages: any = [];
  filteredOptions: Observable<string[]>;

  // normal variable

  serviceItem: any;
  sub: any;
  brandName: string;
  Image_url = environment.IMAGE_URL;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message: string;
  actionButtonLabel = ':)';

  // Boolean variable

  isLoading = false;
  addExtraClass = false;
  isRemovable = true;
  change:boolean = false;
  optional:boolean = false;
  action = true;
  setAutoHide = true;
  requireChange:boolean = true;
  image: any;
  fName: any;
  fType: any;

  // Object variable

  request: any = {};
  item = {
    brand: '',
    currency: '',
    brandName: '',
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
    specification: '',
    warranty: '',
    imageName: []
  };

  // Formcontrol
  brandControl = new FormControl('', [Validators.pattern('[a-zA-Z]*')]);

  constructor(private http: HttpClient,
              public snackBar: MatSnackBar,
              private itemService: ItemService,
              private imageService: ImageService,
              private data: DataService,
              private dialogRef: MatDialogRef<EditComponent>) {
               }

  ngOnInit() {

    this.data.currentMessage.subscribe(message => this.sub = message);

    this.itemService.getItemById(this.sub).subscribe((data: any) => {

      this.http.get<any>(environment.BASE_URL + 'brand/brandName').subscribe(brandDetails => {
        this.item = data;
        this.brandDetails = brandDetails;

        for (let i of this.brandDetails) {
          this.brandNames.push(i.brandName);
        }
        this.item.brandName = brandDetails.find(a => a.brandpk === data.brand).brandName;
        console.log('Item', this.item);
      });
    });

    this.imageService.getImageById(this.sub).subscribe((data) => {
      this.serviceImage = data;
      console.log(data);
      if (data.length !== 0) {
        for (let i = 0 ; i < data.length ; i++ ) {
          this.imageNames.push(this.serviceImage[i].imageName);
          this.uploadedImages.push(this.serviceImage[i].imageName);
        }
      }
    });

    this.autocomplete();
  }

  autocomplete() {
    this.filteredOptions = this.brandControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(this.brandNames, value))
    );
  }

  private _filter(feature: string[], value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return feature.filter(option => option.toLowerCase().includes(filterValue));
    }
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
              this.message = 'Uploaded Successfully';
              this.insert();
              this.isRemovable = false;
       },
      (error) => {
                console.log(error);
                alert(error);
            });
  }

  removeImage(i: number) {
    console.log(this.uploadedImages[i]);
    let params;
    if (this.uploadedImages[i]) {
      params = new HttpParams().set('fileName', this.uploadedImages[i]);
    } else {
      params = new HttpParams().set('fileName', this.imageNames[i]);
    }
    this.http.delete(environment.BASE_URL + 'api/deleteFile', { params: params }).subscribe( data => {
      this.message = data['message'];
      this.insert();
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
    const itemBrand = this.brandDetails.find(id => id.brandName.toLowerCase() === this.item.brandName.toLowerCase());
    if (!itemBrand) {
      let brandaddition = {
        brand: this.item.brandName
      }
      this.http.post(environment.BASE_URL + 'brand/addbrand', brandaddition)
      .subscribe((details: any) => {
        console.log('Items', this.item);
        this.item.brand = details.brandpk;
        console.log(this.item);
        this.itemService.editItem(this.item);
        this.message = 'Edited Sucessfully';
        this.insert();
        this.dialogRef.close();
      });
    } else {
      this.item.brand = itemBrand.brandpk;
      console.log(this.item);
      this.itemService.editItem(this.item);
      this.message = 'Edited Sucessfully';
      this.insert();
      this.dialogRef.close();
    }
  }
}

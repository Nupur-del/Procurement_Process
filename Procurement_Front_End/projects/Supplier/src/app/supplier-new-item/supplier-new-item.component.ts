import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-supplier-new-item',
  templateUrl: './supplier-new-item.component.html',
  styleUrls: ['./supplier-new-item.component.scss']
})
export class SupplierNewItemComponent implements OnInit {

  item: any = {};
  myFiles:string [] = [];
  imageNames:string[] = [];
  uploadedImages: string[] = [];
  image: any;
  supplierID: any;
  isRemovable = true;
  change = true;
  optional = false;
  requireChange= true;
  fName: any;
  fType: any;

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    this.supplierID = localStorage.getItem('userId');
  }

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      const name = event.target.files[i].name;
      let sample = String(name);
      this.myFiles.push(event.target.files[i]);
      this.imageNames.push(sample);
      // }
    }
    console.log(this.myFiles);
    console.log(this.imageNames);
    this.imageNames = this.removeDuplicates(this.imageNames);
    this.change = false;
  }


  onUpload() {
    let formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      let image = this.uploadedImages[i] != null ? this.uploadedImages[i] : 'dummy';
      let compareImage = this.imageNames[i] != null ? this.imageNames[i] : 'compare';
      if (image.includes(compareImage) === false) {
       formData.append("file", this.myFiles[i]);
      }
    }
    console.log(formData);
    this.http.post(environment.BASE_URL + 'api/upload', formData).subscribe(
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
          m[v]=true;
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

  addItem() {
    this.item.imageName = this.uploadedImages;
    this.item.supplier = this.supplierID;
    console.log(this.item);
    this.http.post(environment.BASE_URL + 'item/items', this.item).subscribe(data => {
    console.log(data);
    this.router.navigate(['/supplierItems']);
    }, err => {
    console.log(err);
    });
  }
}

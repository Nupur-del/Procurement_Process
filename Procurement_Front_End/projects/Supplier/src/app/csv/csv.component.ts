import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CSVRecord } from './CSVRecord';
import { Papa} from 'ngx-papaparse';
import { DataService } from '../data.service';
import { ItemService } from '../item.service';
import { MatDialogRef } from '@angular/material';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss']
})

export class CSVComponent implements OnInit {

  change: boolean = true;
  sub: any;
  items: any[] = [];
  convertData: any[] = [];
  public convertLength: any;

  public records: any = [];
  @ViewChild('csvReader', {static: false})
  csvReader: any;

  message: string;
  actionButtonLabel = ':)';
  action = true;
  setAutoHide = true;
  autoHide = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  addExtraClass = false;
  constructor(private papa: Papa,
              private data: DataService,
              private itemService: ItemService,
              private dialogRef: MatDialogRef<CSVComponent>,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.sub = message);
  }

  insert() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }

  uploadListener($event: any): void {
    let text = [];
    let files = $event.srcElement.files;
    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        this.change = false;
        this.papa.parse(files[0], {
          complete: (result) => {
              this.data.changeMessage(result.data.length);
              for (let i = 1 ; i < result.data.length; i++) {
                this.convertData.push(result.data[i]);
              }
              for (let i=0;i<this.convertData.length;i++) {
                let temp: any = {};
                temp.name = this.convertData[i][0];
                temp.sku = this.convertData[i][1];
                temp.brand = this.convertData[i][2];
                temp.price = this.convertData[i][3];
                temp.currency = this.convertData[i][4];
                temp.features = this.convertData[i][5];
                temp.desc = this.convertData[i][6];
                temp.discount = this.convertData[i][7];
                temp.quantity = this.convertData[i][8];
                temp.threshold = this.convertData[i][9];
                temp.warranty = this.convertData[i][10];
                temp.policy = this.convertData[i][11];
                temp.location = this.convertData[i][12];
                this.items.push(temp);
              }
              console.log(this.items);
          }
      });
      };
      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.name = curruntRecord[0].trim();
        csvRecord.sku = curruntRecord[1].trim();
        csvRecord.brand = curruntRecord[2].trim();
        csvRecord.price = curruntRecord[3].trim();
        csvRecord.currency = curruntRecord[4].trim();
        csvRecord.features = curruntRecord[5].trim();
        csvRecord.desc = curruntRecord[6].trim();
        csvRecord.discount = curruntRecord[7].trim();
        csvRecord.quantity = curruntRecord[8].trim();
        csvRecord.threshold = curruntRecord[9].trim();
        csvRecord.warranty = curruntRecord[10].trim();
        csvRecord.policy = curruntRecord[11].trim();
        csvRecord.location = curruntRecord[12].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }

  removeRecord(i: number) {
    this.records.splice(i, 1);
    console.log(this.records);
    this.items.splice(i, 1);
    console.log(this.items);
  }

  addItem(refresher) {
    for(let i=0;i<this.items.length;i++) {
    this.itemService.addItemByCSV(this.items[i]);
    }
    this.message = 'Items Added Sucessfully';
    this.insert();
    this.dialogRef.close();
  }
}

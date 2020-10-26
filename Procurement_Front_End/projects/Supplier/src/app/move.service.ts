import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoveService {

  data: any;

  constructor() { }


  setData(data: any)
  {
    this.data = data;
    console.log('moved data', this.data);
  }

  getData()
  {
    return this.data;
  }
}

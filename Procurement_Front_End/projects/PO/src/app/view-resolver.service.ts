import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MessageService } from './message.service';
import { POService } from './po.service';

@Injectable({
  providedIn: 'root'
})
export class ViewResolverService implements Resolve<any> {
  sub: any;
  imageNames: any =[];
  po: any = {};

  constructor(private message: MessageService,
              private poService: POService) { }

  resolve()
  {
    this.message.currentMessage.subscribe(message => this.sub = message);

    this.poService.getPoByBillNo(this.sub).subscribe((data: any) => {
      console.log(data);
      this.po = data;
    });

    this.poService.getAttachmentsByBillNo(this.sub).subscribe((data: any) => {
      console.log(data);
      this.imageNames = data;
    });

  }
}

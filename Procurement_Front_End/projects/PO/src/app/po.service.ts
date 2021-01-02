import { Injectable } from '@angular/core';
import { IPO } from '../app/po';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class POService {
  constructor(private http: HttpClient,
              private router: Router) { }

  addPO(po: any) {
      console.log(po);
      this.http.post(environment.BASE_URL + 'Purchase/po', po).subscribe(data => {
      console.log(data);
      let orderData = {
        status: 5,
        item: po.item,
        message: 'PO sent to Supplier'
      };
      this.http.post(environment.BASE_URL + 'Purchase_order/update_status', orderData).subscribe(response => {
        console.log(response);
      }, err => {
        console.log(err);
      });
      this.router.navigate(['/requisitionHome']);
    }, err => {
      console.log(err);
      return err;
    });
   }

   getPOByStatus(status: any, usertype: any, user?: any): Observable<IPO[]> {
     let Poparams = new HttpParams().set('status', status).set('user', user).set('type', usertype);
     console.log(status, user, usertype);
     return this.http.get<IPO[]>(environment.BASE_URL + 'Purchase_order/po_by_status', { params: Poparams });
   }

   getInProgressPO(type: any, user: any): Observable<IPO[]> {
      let sparams = new HttpParams().set('type', type).set('user',user);
      return this.http.get<IPO[]>(environment.BASE_URL + 'Purchase_order/inProgress_PO', {params: sparams});
   }

  //  getPOItemByStatus(status: any, usertype: any, user: any): Observable<IPO[]> {
  //    let Pparams = new HttpParams().set('status', status).set('type', usertype).set('user', user);
  //    if (usertype === 'Supplier') {
  //     return this.http.get<IPO[]>(environment.BASE_URL + 'Purchase/allPo_byStatus', { params: Pparams });
  //    } else {
  //     return this.http.get<IPO[]>(environment.BASE_URL + 'Purchase/allPo_by', { params: Pparams });
  //    }
  //  }

   getPOCount(): Observable<number> {
     return this.http.get<number>(environment.BASE_URL + 'Purchase/allPo');
   }

   getallPO(): Observable<any> {
      return this.http.get<any>(environment.BASE_URL + 'Purchase/all');
   }

   getStatusPOCount(status: any, type: any, userId?: any): Observable<any> {
     let Sparams = new HttpParams().set('status', status).set('user', userId).set('type', type);
     return this.http.get<any>(environment.BASE_URL + 'Purchase_order/countPo_by_status', { params: Sparams });
   }

   getInprogressPoCount(type: any,userId?: any): Observable<any> {
    let Sparams = new HttpParams().set('user', userId).set('type', type);
     return this.http.get<any>(environment.BASE_URL + 'Purchase_order/InProgressPo_count', {params: Sparams});
   }

   getPoByBillNo(billNo: any): Observable<any> {
    let Bparams = new HttpParams().set('billNo', billNo);
    return this.http.get<any>(environment.BASE_URL + 'Purchase_order/po_by_billNo', { params: Bparams });
   }

   getAttachmentsByBillNo(billNo: any): Observable<string[]> {
    let Bparams = new HttpParams().set('billNo', billNo);
    return this.http.get<string[]>(environment.BASE_URL + 'Purchase_order/attachments_by_billNo', { params: Bparams });
   }

   getInvoiceByBillNo(billNo: any): Observable<any> {
    let Iparams = new HttpParams().set('billNo', billNo);
    return this.http.get<any>(environment.BASE_URL + 'invoice_up/invoice_by_billNo', { params: Iparams });
   }

   getInvoiceByItemId(item_id: any): Observable<IPO> {
    let invoiceParams = new HttpParams().set('item_id', item_id);
    return this.http.get<IPO>(environment.BASE_URL + 'invoice/invoice_by_item_id', { params: invoiceParams });
   }
}

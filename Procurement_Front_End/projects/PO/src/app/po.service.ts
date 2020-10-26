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
      let poData: IPO;
      for (let i of po.attachments) {
        poData = {
          billNo: po.billNo,
          order_id: po.order_id,
          item_id: po.item_id,
          reqName: po.reqName,
          urg_msg: po.urg_msg,
          attachments: i,
          reason: po.reason,
          comment: po.reason,
          behalf: po.behalf,
          purchase_type: po.purchase_type,
          message: po.message,
          currency: po.currency,
          org_billed: po.org_billed,
          cmp_name: po.cmp_name,
          location: po.location,
          bill_to_address: po.bill_to_address,
          delivery_to: po.delivery_to,
          required_by: po.required_by,
          delivery_address: po.delivery_address,
          cost_center: po.cost_center,
          project_code: po.project_code,
          budget_code: po.budget_code,
          item_name: po.item_name,
          quantity: po.quantity,
          price: po.price,
          total: po.total,
          status: 'Pending'
        };
      }
      this.http.post(environment.BASE_URL + 'Purchase/po', poData).subscribe(data => {
      console.log(data);
      let orderData = {
        status: 'PO created',
        order_id: po.order_id,
        item_id: po.item_id,
        message: 'PO sent to Supplier'
      };
      this.http.post(environment.BASE_URL + 'Purchase_order/update_status', orderData).subscribe(response => {
      console.log(response);
      });
      this.router.navigate(['/requisitionHome']);
    }, err => {
      console.log(err);
      return err;
    });
   }

   getPOByStatus(status: any): Observable<IPO[]> {
     let Poparams = new HttpParams().set('status', status);
     return this.http.get<IPO[]>(environment.BASE_URL + 'Purchase_order/po_by_status',
     { params: Poparams });
   }

   getInProgressPO(): Observable<IPO[]> {
      return this.http.get<IPO[]>(environment.BASE_URL + 'Purchase_order/inProgress_PO');
   }

   getPOItemByStatus(status: any): Observable<IPO[]> {
     let Pparams = new HttpParams().set('status', status);
     return this.http.get<IPO[]>(environment.BASE_URL + 'Purchase/allPo_byStatus', { params: Pparams });
   }

   getPOCount(): Observable<number> {
     return this.http.get<number>(environment.BASE_URL + 'Purchase/allPo');
   }

   getStatusPOCount(status: any): Observable<any> {
     let Sparams = new HttpParams().set('status', status);
     return this.http.get<any>(environment.BASE_URL + 'Purchase_order/countPo_by_status', { params: Sparams });
   }

   getInprogressPoCount(): Observable<any> {
     return this.http.get<any>(environment.BASE_URL + 'Purchase_order/InProgressPo_count');
   }

   getPoByBillNo(billNo: any): Observable<any> {
    let Bparams = new HttpParams().set('billNo', billNo);
    return this.http.get<any>(environment.BASE_URL + 'Purchase/po_by_billNo', { params: Bparams });
   }

   getAttachmentsByBillNo(billNo: any): Observable<string[]> {
    let Bparams = new HttpParams().set('billNo', billNo);
    return this.http.get<string[]>(environment.BASE_URL + 'Purchase_order/attachments_by_billNo', { params: Bparams });
   }

   getInvoiceByBillNo(billNo: any): Observable<IPO> {
    let Iparams = new HttpParams().set('billNo', billNo);
    return this.http.get<IPO>(environment.BASE_URL + 'invoice/invoice_by_billNo', { params: Iparams });
   }

   getInvoiceByItemId(item_id: any): Observable<IPO> {
    let invoiceParams = new HttpParams().set('item_id', item_id);
    return this.http.get<IPO>(environment.BASE_URL + 'invoice/invoice_by_item_id', { params: invoiceParams });
   }
}

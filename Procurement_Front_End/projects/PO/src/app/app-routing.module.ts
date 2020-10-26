import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseOrderComponent} from './purchase-order/purchase-order.component';
import { InvoiceComponent} from './invoice/invoice.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { AppComponent } from './app.component';
import { CreatePOComponent } from './create-po/create-po.component';
import { POResolverService } from './poresolver.service';
import { PendingPOComponent } from './pending-po/pending-po.component';
import { ViewPOComponent } from './view-po/view-po.component';
import { ViewResolverService } from './view-resolver.service';
import { ApprovedPOComponent } from './approved-po/approved-po.component';
import { POTrackComponent } from './potrack/potrack.component';
import { CheckPOComponent } from './check-po/check-po.component';
import { DeliveredPoComponent } from './delivered-po/delivered-po.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { TrackDashboardComponent } from './track-dashboard/track-dashboard.component';



const routes: Routes = [
  {path: "purchase-order", component: PurchaseOrderComponent, resolve: { po: POResolverService }},
  {path: "invoice", component: InvoiceComponent},
  {path: "track-dashboard", component: TrackDashboardComponent},
  {path: "track-order", component: TrackOrderComponent},
  {path: "PO", component: AppComponent},
  {path: "createPO", component: CreatePOComponent},
  {path: "pendingPO", component: PendingPOComponent},
  {path: "approvedPO", component: ApprovedPOComponent},
  {path: "poTrack", component: POTrackComponent},
  {path: "checkPO", component: CheckPOComponent},
  {path: "viewPO", component: ViewPOComponent, resolve: { view: ViewResolverService }},
  {path: "deliveredPO", component: DeliveredPoComponent},
  {path: "viewInvoice", component: EditInvoiceComponent, resolve: { view: ViewResolverService }},
  {path: "invoiceView", component: ViewInvoiceComponent, resolve: { view: ViewResolverService }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

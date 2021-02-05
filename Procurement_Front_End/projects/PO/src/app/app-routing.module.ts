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
import { DeniedPOComponent } from './denied-po/denied-po.component';
import { AuthGuard } from '../../../../src/app/auth.guard';

const routes: Routes = [
  {path: "purchase-order", component: PurchaseOrderComponent, resolve: { po: POResolverService }, canActivate: [AuthGuard]},
  {path: "invoice", component: InvoiceComponent , canActivate: [AuthGuard]},
  {path: "track-dashboard", component: TrackDashboardComponent , canActivate: [AuthGuard]},
  {path: "track-order", component: TrackOrderComponent , canActivate: [AuthGuard]},
  {path: "PO", component: AppComponent , canActivate: [AuthGuard]},
  {path: "createPO", component: CreatePOComponent , canActivate: [AuthGuard]},
  {path: "pendingPO", component: PendingPOComponent , canActivate: [AuthGuard]},
  {path: "deniedPO", component: DeniedPOComponent , canActivate: [AuthGuard]},
  {path: "approvedPO", component: ApprovedPOComponent, canActivate: [AuthGuard]},
  {path: "poTrack", component: POTrackComponent , canActivate: [AuthGuard]},
  {path: "checkPO", component: CheckPOComponent , canActivate: [AuthGuard]},
  {path: "viewPO", component: ViewPOComponent, resolve: { view: ViewResolverService }, canActivate: [AuthGuard]},
  {path: "deliveredPO", component: DeliveredPoComponent , canActivate: [AuthGuard]},
  {path: "viewInvoice", component: EditInvoiceComponent, resolve: { view: ViewResolverService }, canActivate: [AuthGuard]},
  {path: "invoiceView", component: ViewInvoiceComponent, resolve: { view: ViewResolverService }, canActivate: [AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
import { VerifiedGuard } from 'src/app/verified.guard';

const routes: Routes = [
  {path: "purchase-order", component: PurchaseOrderComponent, resolve: { po: POResolverService }, canActivate: [VerifiedGuard]},
  {path: "invoice", component: InvoiceComponent , canActivate: [VerifiedGuard]},
  {path: "track-dashboard", component: TrackDashboardComponent , canActivate: [VerifiedGuard]},
  {path: "track-order", component: TrackOrderComponent , canActivate: [VerifiedGuard]},
  {path: "PO", component: AppComponent , canActivate: [VerifiedGuard]},
  {path: "createPO", component: CreatePOComponent , canActivate: [VerifiedGuard]},
  {path: "pendingPO", component: PendingPOComponent , canActivate: [VerifiedGuard]},
  {path: "deniedPO", component: DeniedPOComponent , canActivate: [VerifiedGuard]},
  {path: "approvedPO", component: ApprovedPOComponent, canActivate: [VerifiedGuard]},
  {path: "poTrack", component: POTrackComponent , canActivate: [VerifiedGuard]},
  {path: "checkPO", component: CheckPOComponent , canActivate: [VerifiedGuard]},
  {path: "viewPO", component: ViewPOComponent, resolve: { view: ViewResolverService }, canActivate: [VerifiedGuard]},
  {path: "deliveredPO", component: DeliveredPoComponent , canActivate: [VerifiedGuard]},
  {path: "viewInvoice", component: EditInvoiceComponent, resolve: { view: ViewResolverService }, canActivate: [VerifiedGuard]},
  {path: "invoiceView", component: ViewInvoiceComponent, resolve: { view: ViewResolverService }, canActivate: [VerifiedGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

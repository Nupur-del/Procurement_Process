import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RequestComponent } from './request/request.component';
import { EditComponent } from './edit/edit.component';
import {NotApprovedComponent} from './not-approved/not-approved.component';
import {ResendMailComponent} from './resend-mail/resend-mail.component';
import { PendingComponent } from './pending/pending.component';
import { ViewComponent } from './view/view.component';
import { OrderComponent } from './order/order.component';
import { ApprovedComponent } from './approved/approved.component';
import { SupplierModule } from '../../projects/Supplier/src/app/app.module';
import { POModule } from '../../projects/PO/src/app/app.module';
import { EditResolverService } from './edit-resolver.service';
import { RequisitionHomeComponent } from './requisition-home/requisition-home.component';
import { DeniedComponent } from './denied/denied.component';
import { SupplierRegistrationComponent } from './supplier-registration/supplier-registration.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuard } from './auth.guard';
import { SupplierApprovalComponent } from './supplier-approval/supplier-approval.component';
import {ActivationSupplierAccountComponent} from './activation-supplier-account/activation-supplier-account.component';
import { VerifiedGuard } from './verified.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [VerifiedGuard]},
  {path: 'home', component: HomeComponent,  canActivate: [VerifiedGuard]},
  {path: 'request', component: RequestComponent,  canActivate: [VerifiedGuard]},
  {path: 'edit', component: EditComponent, resolve: { editItem: EditResolverService },  canActivate: [VerifiedGuard]},
  {path: 'pending', component: PendingComponent,  canActivate: [VerifiedGuard]},
  {path: 'denied', component: DeniedComponent,  canActivate: [VerifiedGuard]},
  {path: 'view', component: ViewComponent,  canActivate: [VerifiedGuard]},
  {path: 'approved', component: ApprovedComponent, canActivate: [VerifiedGuard]},
  {path: 'order', component: OrderComponent,  canActivate: [VerifiedGuard]},
  {path: 'requisitionHome', component: RequisitionHomeComponent,  canActivate: [VerifiedGuard]},
  {path: 'supplierRegistration', component: SupplierRegistrationComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'notApproved', component: NotApprovedComponent, canActivate:[AuthGuard]},
  {path: 'resendEmail', component: ResendMailComponent, canActivate: [AuthGuard]},
  {path: 'activateAccount', component:  ActivationSupplierAccountComponent, canActivate:[VerifiedGuard]},
  {path: 'SupplierApproval', component: SupplierApprovalComponent, canActivate:[VerifiedGuard]},
  {path: 'supplierItems', loadChildren: '../../projects/Supplier/src/app/app.module#SupplierModule',  canLoad: [VerifiedGuard]},
  {path: 'supplierHome', loadChildren: '../../projects/Supplier/src/app/app.module#SupplierModule',  canLoad: [VerifiedGuard]},
  {path: 'PO', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canLoad: [VerifiedGuard]},
  {path: 'purchase-order', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canLoad: [VerifiedGuard]},
  {path: 'track-order', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canLoad: [VerifiedGuard]},
  {path: 'track-dashboard', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canLoad: [VerifiedGuard]},
  {path: 'invoice', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canLoad: [VerifiedGuard]},
  {path: 'createPO', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canLoad: [VerifiedGuard]},
  {path: 'deliveredPO', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canLoad: [VerifiedGuard]},
  { path: 'pendingPO', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canLoad: [VerifiedGuard]},
  { path: 'deniedPO', loadChildren:'../../projects/PO/src/app/app.module#POModule',  canLoad: [VerifiedGuard]},
  { path: 'approvedPO', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canLoad: [VerifiedGuard]},
  {path: 'deliveredPO', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canLoad: [VerifiedGuard]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  SupplierModule.forRoot(),
POModule.forRoot()],
  exports: [RouterModule]
})

// , resolve: {orderList: PendingResolverService}
export class AppRoutingModule { }

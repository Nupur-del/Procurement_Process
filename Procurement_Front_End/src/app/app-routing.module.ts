import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RequestComponent } from './request/request.component';
import { EditComponent } from './edit/edit.component';
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

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent,  canActivate: [AuthGuard]},
  {path: 'request', component: RequestComponent,  canActivate: [AuthGuard]},
  {path: 'edit', component: EditComponent, resolve: { editItem: EditResolverService },  canActivate: [AuthGuard]},
  {path: 'pending', component: PendingComponent,  canActivate: [AuthGuard]},
  {path: 'denied', component: DeniedComponent,  canActivate: [AuthGuard]},
  {path: 'view', component: ViewComponent,  canActivate: [AuthGuard]},
  {path: 'approved', component: ApprovedComponent, canActivate: [AuthGuard]},
  {path: 'order', component: OrderComponent,  canActivate: [AuthGuard]},
  {path: 'requisitionHome', component: RequisitionHomeComponent,  canActivate: [AuthGuard]},
  {path: 'supplierRegistration', component: SupplierRegistrationComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'activateAccount', component:  ActivationSupplierAccountComponent, canActivate:[AuthGuard]},
  {path: 'SupplierApproval', component: SupplierApprovalComponent, canActivate:[AuthGuard]},
  {path: 'supplierItems', loadChildren: '../../projects/Supplier/src/app/app.module#SupplierModule',  canActivate: [AuthGuard]},
  {path: 'supplierHome', loadChildren: '../../projects/Supplier/src/app/app.module#SupplierModule',  canActivate: [AuthGuard]},
  {path: 'PO', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canActivate: [AuthGuard]},
  {path: 'purchase-order', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canActivate: [AuthGuard]},
  {path: 'track-order', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canActivate: [AuthGuard]},
  {path: 'track-dashboard', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canActivate: [AuthGuard]},
  {path: 'invoice', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canActivate: [AuthGuard]},
  {path: 'createPO', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canActivate: [AuthGuard]},
  {path: 'deliveredPO', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canActivate: [AuthGuard]},
  { path: 'pendingPO', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canActivate: [AuthGuard]},
  { path: 'deniedPO', loadChildren:'../../projects/PO/src/app/app.module#POModule',  canActivate: [AuthGuard]},
  { path: 'approvedPO', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canActivate: [AuthGuard]},
  {path: 'deliveredPO', loadChildren: '../../projects/PO/src/app/app.module#POModule',  canActivate: [AuthGuard]},
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

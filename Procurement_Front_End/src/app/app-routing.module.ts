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

const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'home', component: HomeComponent},
  {path: 'request', component: RequestComponent},
  {path: 'edit', component: EditComponent, resolve: { editItem: EditResolverService }},
  {path: 'pending', component: PendingComponent},
  {path: 'view', component: ViewComponent},
  {path: 'approved', component: ApprovedComponent},
  {path: 'order', component: OrderComponent},
  {path: 'requisitionHome', component: RequisitionHomeComponent},
  {path: 'supplierItems', loadChildren: '../../projects/Supplier/src/app/app.module#SupplierModule'},
  {path: 'supplierHome', loadChildren: '../../projects/Supplier/src/app/app.module#SupplierModule'},
  {path: 'PO', loadChildren: '../../projects/PO/src/app/app.module#POModule'},
  {path: 'purchase-order', loadChildren: '../../projects/PO/src/app/app.module#POModule'},
  {path: 'track-order', loadChildren: '../../projects/PO/src/app/app.module#POModule'},
  {path: 'track-dashboard', loadChildren: '../../projects/PO/src/app/app.module#POModule'},
  {path: 'invoice', loadChildren: '../../projects/PO/src/app/app.module#POModule'},
  {path: 'createPO', loadChildren: '../../projects/PO/src/app/app.module#POModule'},
  {path: 'deliveredPO', loadChildren: '../../projects/PO/src/app/app.module#POModule'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  SupplierModule.forRoot(),
POModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }

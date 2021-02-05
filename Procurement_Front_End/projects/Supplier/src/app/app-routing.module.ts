import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierHomeComponent } from './supplier-home/supplier-home.component';
import { SupplierItemsComponent } from './supplier-items/supplier-items.component';
import { SupplierNewItemComponent } from './supplier-new-item/supplier-new-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { EditResolverService } from './edit-resolver.service';
import { ItemResolverService } from './item-resolver.service';
import { POModule } from '../../../PO/src/app/app.module';
import {AuthGuard} from '../../../../src/app/auth.guard';


const routes: Routes = [
  { path: 'supplierHome', component: SupplierHomeComponent,canActivate: [AuthGuard] },
  { path: 'supplierItems', component: SupplierItemsComponent, resolve: { items: ItemResolverService }, canActivate: [AuthGuard] },
  { path: 'supplier/newItem', component: SupplierNewItemComponent, canActivate: [AuthGuard] },
  { path: 'editItem', component: EditItemComponent, resolve: { editItem: EditResolverService }},
  { path: 'invoice', loadChildren: '../../../PO/src/app/app.module#POModule', canActivate: [AuthGuard]},
  { path: 'track-order', loadChildren: '../../../PO/src/app/app.module#POModule', canActivate: [AuthGuard]},
  { path: 'track-dashboard', loadChildren: '../../../PO/src/app/app.module#POModule',canActivate: [AuthGuard]},
  { path: 'pendingPO', loadChildren: '../../../PO/src/app/app.module#POModule', canActivate: [AuthGuard]},
  { path: 'approvedPO', loadChildren: '../../../PO/src/app/app.module#POModule', canActivate: [AuthGuard]},
  { path: 'deniedPO', loadChildren:'../../../PO/src/app/app.module#POModule', canActivate: [AuthGuard]},
  { path: 'viewPO', loadChildren: '../../../PO/src/app/app.module#POModule', canActivate: [AuthGuard]},
  { path: 'deliveredPO', loadChildren: '../../../PO/src/app/app.module#POModule', canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  POModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }

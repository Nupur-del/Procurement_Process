import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule, MatNativeDateModule  } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { MatMenuModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule, MatOptionModule } from '@angular/material';
import { RequestComponent } from './request/request.component';
import { EditComponent } from './edit/edit.component';
import { PendingComponent } from './pending/pending.component';
import { ViewComponent } from './view/view.component';
import { ApprovedComponent } from './approved/approved.component';
import { OrderComponent } from './order/order.component';
import { MatSortModule } from '@angular/material';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { SupplierModule } from '../../projects/Supplier/src/app/app.module';
import { POModule } from '../../projects/PO/src/app/app.module';
import { RequisitionHomeComponent } from './requisition-home/requisition-home.component';
import { DeliveredPoComponent } from './projects/PO/delivered-po/delivered-po.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    RequestComponent,
    EditComponent,
    PendingComponent,
    ViewComponent,
    ApprovedComponent,
    OrderComponent,
    MyDialogComponent,
    RequisitionHomeComponent,
    DeliveredPoComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    MatSortModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatNativeDateModule ,
    MatListModule,
    MatSelectModule,
    SupplierModule.forRoot(),
    POModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: AppComponent
      },
      {
        path: 'home',
        component: AppComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'request',
        component: RequestComponent
      },
      {
        path: 'edit',
        component: EditComponent
      },
      {
        path: 'pending',
        component: PendingComponent
      },
      {
        path: 'view',
        component: ViewComponent
      },
      {
        path: 'approved',
        component: ApprovedComponent
      },
      {
        path: 'order',
        component: OrderComponent
      }

    ])
  ],
  entryComponents: [MyDialogComponent],
  providers: [AuthService, AuthGuard, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

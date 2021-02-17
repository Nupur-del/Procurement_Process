import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CustomFormsModule } from 'ng2-validation';
import {MatRadioModule} from '@angular/material/radio';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule, MatNativeDateModule  } from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NotApprovedComponent} from './not-approved/not-approved.component';
import {ResendMailComponent} from './resend-mail/resend-mail.component';
import {VerifiedGuard} from './verified.guard';
import { AuthGuard } from './auth.guard';
import { MatMenuModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule} from '@angular/material';
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
import { DeniedComponent } from './denied/denied.component';
import {MatBadgeModule} from '@angular/material/badge';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { SupplierRegistrationComponent } from './supplier-registration/supplier-registration.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SupplierApprovalComponent } from './supplier-approval/supplier-approval.component';
import { ActivationSupplierAccountComponent } from './activation-supplier-account/activation-supplier-account.component';

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
    NotApprovedComponent,
    ResendMailComponent,
    MyDialogComponent,
    MessageDialogComponent,
    RequisitionHomeComponent,
    DeliveredPoComponent,
    DeniedComponent,
    SupplierRegistrationComponent,
    VerifyEmailComponent,
    SupplierApprovalComponent,
    ActivationSupplierAccountComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    MatBadgeModule,
    MatSortModule,
    MatRadioModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    NgImageSliderModule,
    ScrollingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatPaginatorModule,
    CustomFormsModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatNativeDateModule ,
    MatListModule,
    SupplierModule.forRoot(),
    POModule.forRoot()
  ],
  entryComponents: [MyDialogComponent, MessageDialogComponent],
  providers: [AuthService, AuthGuard, MatDatepickerModule, VerifiedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

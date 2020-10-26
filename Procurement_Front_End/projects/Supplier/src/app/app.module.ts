import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule, MatNativeDateModule  } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule, MatOptionModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SupplierHomeComponent } from './supplier-home/supplier-home.component';
import { SupplierNewItemComponent } from './supplier-new-item/supplier-new-item.component';
import { SupplierItemsComponent } from './supplier-items/supplier-items.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { CSVComponent } from './csv/csv.component';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SupplierHomeComponent,
    SupplierNewItemComponent,
    SupplierItemsComponent,
    EditItemComponent,
    CSVComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CSVComponent]
})
export class AppModule { }

@NgModule({})
export class SupplierModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [{
        provide: MatDialogRef,
        useValue: []
         },
        {
        provide: MAT_DIALOG_DATA,
        useValue: []
        }]
    }
  }
}

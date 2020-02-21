import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {OrderPageComponent} from '@src/app/order/order-page/order-page.component';
import {TableFormComponent} from '@src/app/order/dialogs/table-form/table-form.component';
import {ImageDetailComponent} from '@src/app/order/dialogs/image-detail/image-detail.component';
import {CartComponent} from '@src/app/order/cart/cart.component';
import {OrderFormComponent} from '@src/app/order/order-form/order-form.component';
import {InvoiceComponent} from '@src/app/order/dialogs/invoice/invoice.component';
import {OrderListComponent} from '@src/app/order/order-list/order-list.component';
import {OrderDetailDialogComponent} from '@src/app/order/dialogs/order-detail-dialog/order-detail-dialog.component';
import {SendOrderEmailDialogComponent} from '@src/app/order/dialogs/send-order-email-dialog/send-order-email-dialog.component';
import {OrderRoutingModule} from '@src/app/order/order-routing.module.tns';
import {StoreModule} from '@ngrx/store';
import * as fromUnits from '@src/app/order/_store/_reducers/order-unit.reducer';
import * as fromTables from '@src/app/order/_store/_reducers/table.reducer';
import * as fromOrder from '@src/app/order/_store/_reducers/order.reducer';
import {NativeScriptHttpClientModule} from 'nativescript-angular/http-client';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    OrderRoutingModule,
    StoreModule.forFeature(fromUnits.orderUnitsFeatureKey, fromUnits.reducer),
    StoreModule.forFeature(fromTables.tablesFeatureKey, fromTables.reducer),
    StoreModule.forFeature(fromOrder.ordersFeatureKey, fromOrder.reducer),
    NativeScriptHttpClientModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTableModule,
    CdkTableModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  declarations: [
    OrderPageComponent,
    TableFormComponent,
    ImageDetailComponent,
    CartComponent,
    OrderFormComponent,
    InvoiceComponent,
    OrderListComponent,
    OrderDetailDialogComponent,
    SendOrderEmailDialogComponent],
  providers: [],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  exports: [
    OrderPageComponent,
    TableFormComponent,
    ImageDetailComponent,
    CartComponent,
    OrderFormComponent,
    InvoiceComponent,
  ]
})
export class OrderModule {
}

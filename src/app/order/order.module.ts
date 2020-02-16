import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderPageComponent} from 'src/app/order/order-page/order-page.component';
import {TableFormComponent} from 'src/app/order/dialogs/table-form/table-form.component';
import {TableDetailComponent} from 'src/app/order/dialogs/table-detail/table-detail.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageDetailComponent} from './dialogs/image-detail/image-detail.component';
import {CartComponent} from './cart/cart.component';
import {StoreModule} from '@ngrx/store';
import * as fromUnits from 'src/app/order/_store/_reducers/order-unit.reducer';
import {OrderFormComponent} from './order-form/order-form.component';
import * as fromTables from 'src/app/order/_store/_reducers/table.reducer';
import {InvoiceComponent} from './dialogs/invoice/invoice.component';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {OrderRoutingModule} from 'src/app/order/order-routing.module';
import {OrderListComponent} from './order-list/order-list.component';
import * as fromOrder from 'src/app/order/_store/_reducers/order.reducer';
import {CdkTableModule} from '@angular/cdk/table';
import {OrderDetailDialogComponent} from './dialogs/order-detail-dialog/order-detail-dialog.component';
import {SendOrderEmailDialogComponent} from './dialogs/send-order-email-dialog/send-order-email-dialog.component';

@NgModule({
  declarations: [
    OrderPageComponent,
    TableFormComponent,
    TableDetailComponent,
    ImageDetailComponent,
    CartComponent,
    OrderFormComponent,
    InvoiceComponent,
    OrderListComponent,
    OrderDetailDialogComponent,
    SendOrderEmailDialogComponent,
  ],
  imports: [
    StoreModule.forFeature(fromUnits.orderUnitsFeatureKey, fromUnits.reducer),
    StoreModule.forFeature(fromTables.tablesFeatureKey, fromTables.reducer),
    StoreModule.forFeature(fromOrder.ordersFeatureKey, fromOrder.reducer),
    CommonModule,
    OrderRoutingModule,
    HttpClientModule,
    FormsModule,
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
  entryComponents: [
    TableDetailComponent,
    ImageDetailComponent,
    TableFormComponent,
    CartComponent,
    InvoiceComponent,
    OrderDetailDialogComponent,
    SendOrderEmailDialogComponent,
  ],
  exports: [
    OrderPageComponent,
    TableFormComponent,
    TableDetailComponent,
    ImageDetailComponent,
    CartComponent,
    OrderFormComponent,
    InvoiceComponent,
  ]
})
export class OrderModule {
}

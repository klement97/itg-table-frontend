import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { OrderPageComponent } from '@src/app/order/order-page/order-page.component';
import { TableFormComponent } from '@src/app/order/dialogs/table-form/table-form.component';
import { ImageDetailComponent } from '@src/app/order/dialogs/image-detail/image-detail.component';
import { CartComponent } from '@src/app/order/cart/cart.component';
import { OrderFormComponent } from '@src/app/order/order-form/order-form.component';
import { InvoiceComponent } from '@src/app/order/dialogs/invoice/invoice.component';
import { OrderListComponent } from '@src/app/order/order-list/order-list.component';
import { OrderDetailDialogComponent } from '@src/app/order/dialogs/order-detail-dialog/order-detail-dialog.component';
import { SendOrderEmailDialogComponent } from '@src/app/order/dialogs/send-order-email-dialog/send-order-email-dialog.component';

@NgModule({
  imports: [
    NativeScriptCommonModule
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
  providers: [
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class OrderModule { }

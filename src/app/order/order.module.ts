import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderPageComponent} from 'src/app/order/order-page/order-page.component';
import {TableFormComponent} from 'src/app/order/dialogs/table-form/table-form.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageDetailComponent} from './dialogs/image-detail/image-detail.component';
import {CartComponent} from './cart/cart.component';
import {StoreModule} from '@ngrx/store';
import * as fromUnits from 'src/app/order/_store/_reducers/order-unit.reducer';
import {OrderFormComponent} from './order-form/order-form.component';
import * as fromTables from 'src/app/order/_store/_reducers/table.reducer';
import {InvoiceComponent} from './dialogs/invoice/invoice.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {OrderRoutingModule} from 'src/app/order/order-routing.module';
import {OrderListComponent} from './order-list/order-list.component';
import * as fromOrder from 'src/app/order/_store/_reducers/order.reducer';
import {CdkTableModule} from '@angular/cdk/table';
import {OrderDetailDialogComponent} from './dialogs/order-detail-dialog/order-detail-dialog.component';
import {SendOrderEmailDialogComponent} from './dialogs/send-order-email-dialog/send-order-email-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {EffectsModule} from '@ngrx/effects'
import {OrderEffects} from './_store/_effects/order.effects';

@NgModule({
  declarations: [
    OrderPageComponent,
    TableFormComponent,
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
    EffectsModule.forFeature([OrderEffects]),
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
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
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

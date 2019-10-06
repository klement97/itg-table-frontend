import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatBadgeModule,
	MatButtonModule,
	MatCardModule,
	MatChipsModule,
	MatDialogModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatRadioModule,
	MatSelectModule,
	MatSidenavModule,
	MatToolbarModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {OrderPageComponent} from 'src/app/order/order-page/order-page.component';
import {TableFormComponent} from 'src/app/order/dialogs/table-form/table-form.component';
import {TableDetailComponent} from 'src/app/order/dialogs/table-detail/table-detail.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavigationComponent} from 'src/app/navigation/navigation.component';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {ImageDetailComponent} from './dialogs/image-detail/image-detail.component';
import {CartComponent} from './cart/cart.component';
import {StoreModule} from '@ngrx/store';
import * as fromUnits from 'src/app/order/_store/_reducers/order-unit.reducer';
import {orderUnitsFeatureKey} from 'src/app/order/_store/_reducers/order-unit.reducer';
import {OrderFormComponent} from './order-form/order-form.component';
import * as fromTables from 'src/app/order/_store/_reducers/table.reducer';
import {tablesFeatureKey} from 'src/app/order/_store/_reducers/table.reducer';
import {NgxPrintModule} from 'ngx-print';
import { InvoiceComponent } from './dialogs/invoice/invoice.component';

@NgModule({
	declarations: [
		NavigationComponent,
		OrderPageComponent,
		TableFormComponent,
		TableDetailComponent,
		ImageDetailComponent,
		CartComponent,
		OrderFormComponent,
		InvoiceComponent,
	],
	imports: [
		StoreModule.forFeature(orderUnitsFeatureKey, fromUnits.reducer),
		StoreModule.forFeature(tablesFeatureKey, fromTables.reducer),
		CommonModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NgxPrintModule,
		MatToolbarModule,
		MatCardModule,
		MatButtonModule,
		MatInputModule,
		MatSelectModule,
		MatRadioModule,
		LayoutModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatGridListModule,
		MatMenuModule,
		MatDialogModule,
		MatChipsModule,
		MatBadgeModule,
	],
	entryComponents: [
		TableDetailComponent,
		ImageDetailComponent,
		TableFormComponent,
		CartComponent,
		InvoiceComponent
	],
	exports: [OrderPageComponent, TableFormComponent, NavigationComponent, TableDetailComponent]
})
export class OrderModule {
}

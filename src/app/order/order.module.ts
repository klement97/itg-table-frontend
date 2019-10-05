import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule,
	MatCardModule, MatChipsModule, MatDialogModule, MatGridListModule, MatIconModule,
	MatInputModule, MatListModule, MatMenuModule,
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
import { CartComponent } from './cart/cart.component';
import {StoreModule} from '@ngrx/store';
import {orderUnitsFeatureKey} from 'src/app/order/_store/_reducers/order-unit.reducer';
import * as orderUnit from 'src/app/order/_store/_reducers/order-unit.reducer';

@NgModule({
	declarations: [
		NavigationComponent,
		OrderPageComponent,
		TableFormComponent,
		TableDetailComponent,
		ImageDetailComponent,
		CartComponent
	],
	imports: [
		StoreModule.forFeature(orderUnitsFeatureKey, orderUnit.reducer),
		CommonModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
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
	],
	entryComponents: [
		TableDetailComponent,
		ImageDetailComponent,
		TableFormComponent,
		CartComponent,
	],
	exports: [OrderPageComponent, TableFormComponent, NavigationComponent, TableDetailComponent]
})
export class OrderModule {
}

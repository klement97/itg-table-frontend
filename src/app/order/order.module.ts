import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
	MatButtonModule,
	MatCardModule, MatGridListModule, MatIconModule,
	MatInputModule, MatListModule, MatMenuModule,
	MatRadioModule,
	MatSelectModule,
	MatSidenavModule,
	MatToolbarModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {OrderPageComponent} from 'src/app/order/order-page/order-page.component';
import {TableFormComponent} from 'src/app/order/table-form/table-form.component';
import {TableDetailComponent} from 'src/app/order/dialogs/table-detail/table-detail.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavigationComponent} from 'src/app/navigation/navigation.component';
import {AppRoutingModule} from 'src/app/app-routing.module';


@NgModule({
	declarations: [
	  NavigationComponent,
		OrderPageComponent,
		TableFormComponent,
		TableDetailComponent
	],
	imports: [
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
	],
	entryComponents: [
		TableDetailComponent
	],
	exports: [OrderPageComponent, TableFormComponent, NavigationComponent, TableDetailComponent]
})
export class OrderModule {
}

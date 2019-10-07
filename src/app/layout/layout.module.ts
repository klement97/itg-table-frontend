import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from 'src/app/layout/footer/footer.component';
import {NavigationComponent} from 'src/app/layout/navigation/navigation.component';
import {
	MatBadgeModule,
	MatButtonModule,
	MatIconModule,
	MatListModule,
	MatMenuModule,
	MatSidenavModule,
	MatToolbarModule
} from '@angular/material';
import {OrderModule} from 'src/app/order/order.module';
import {RouterModule} from '@angular/router';


@NgModule({
	declarations: [FooterComponent, NavigationComponent],
	imports: [
		CommonModule,
		MatSidenavModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatListModule,
		MatMenuModule,
		OrderModule,
		MatBadgeModule,
		RouterModule,
	],
	exports: [FooterComponent, NavigationComponent],
})
export class LayoutModule {
}

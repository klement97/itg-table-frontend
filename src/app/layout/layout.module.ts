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
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
	declarations: [FooterComponent, NavigationComponent, HeaderComponent, SidebarComponent],
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
	],
	exports: [FooterComponent, NavigationComponent],
})
export class LayoutModule {
}

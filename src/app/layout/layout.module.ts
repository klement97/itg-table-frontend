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
import {DeleteDialogComponent} from './dialogs/delete-dialog/delete-dialog.component';
import {SnackServiceComponent} from './snack-service/snack-service.component';


@NgModule({
	declarations: [FooterComponent, NavigationComponent, DeleteDialogComponent, SnackServiceComponent],
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

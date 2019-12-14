import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from 'src/app/layout/footer/footer.component';
import {NavigationComponent} from 'src/app/layout/navigation/navigation.component';
import {MatBadgeModule,} from '@angular/material/badge';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

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
		MatCardModule,
	],
	exports: [FooterComponent, NavigationComponent, DeleteDialogComponent],
	entryComponents: [DeleteDialogComponent]
})
export class LayoutModule {
}

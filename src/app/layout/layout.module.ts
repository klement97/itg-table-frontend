import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from 'src/app/layout/footer/footer.component';
import {NavigationComponent} from 'src/app/layout/navigation/navigation.component';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {OrderModule} from 'src/app/order/order.module';
import {RouterModule} from '@angular/router';
import {ConfirmationDialogComponent} from 'src/app/layout/dialogs/delete-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [FooterComponent, NavigationComponent, ConfirmationDialogComponent],
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
  exports: [FooterComponent, NavigationComponent, ConfirmationDialogComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class LayoutModule {
}

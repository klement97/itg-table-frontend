import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import {FooterComponent} from '@src/app/layout/footer/footer.component';
import {NavigationComponent} from '@src/app/layout/navigation/navigation.component';
import {ConfirmationDialogComponent} from '@src/app/layout/dialogs/confirmation-dialog/confirmation-dialog.component';
import {IosInstallComponent} from '@src/app/layout/ios-install/ios-install.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {OrderModule} from '@src/app/order/order.module';
import {MatBadgeModule} from '@angular/material/badge';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    NativeScriptCommonModule,
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
  declarations: [
    FooterComponent,
    NavigationComponent,
    ConfirmationDialogComponent,
    IosInstallComponent,
  ],
  providers: [],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  exports: [FooterComponent, NavigationComponent, ConfirmationDialogComponent],
})
export class LayoutModule {
}

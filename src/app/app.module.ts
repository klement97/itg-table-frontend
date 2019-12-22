import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {httpInterceptorProviders} from 'src/app/_interceptors';
import {OrderModule} from 'src/app/order/order.module';
import {AuthModule} from 'src/app/auth/auth.module';
import {LayoutModule} from 'src/app/layout/layout.module';
import * as M from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    OrderModule,
    AuthModule,
    LayoutModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}) : [],
    M.MatCheckboxModule,
    M.MatCheckboxModule,
    M.MatButtonModule,
    M.MatInputModule,
    M.MatAutocompleteModule,
    M.MatDatepickerModule,
    M.MatFormFieldModule,
    M.MatRadioModule,
    M.MatSelectModule,
    M.MatSliderModule,
    M.MatSlideToggleModule,
    M.MatMenuModule,
    M.MatSidenavModule,
    M.MatToolbarModule,
    M.MatListModule,
    M.MatGridListModule,
    M.MatCardModule,
    M.MatStepperModule,
    M.MatTabsModule,
    M.MatExpansionModule,
    M.MatButtonToggleModule,
    M.MatChipsModule,
    M.MatIconModule,
    M.MatProgressSpinnerModule,
    M.MatProgressBarModule,
    M.MatDialogModule,
    M.MatTooltipModule,
    M.MatSnackBarModule,
    M.MatTableModule,
    M.MatSortModule,
    M.MatPaginatorModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}

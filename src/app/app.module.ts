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
import * as MAT from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
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
    MAT.MatCheckboxModule,
    MAT.MatCheckboxModule,
    MAT.MatButtonModule,
    MAT.MatInputModule,
    MAT.MatAutocompleteModule,
    MAT.MatDatepickerModule,
    MAT.MatFormFieldModule,
    MAT.MatRadioModule,
    MAT.MatSelectModule,
    MAT.MatSliderModule,
    MAT.MatSlideToggleModule,
    MAT.MatMenuModule,
    MAT.MatSidenavModule,
    MAT.MatToolbarModule,
    MAT.MatListModule,
    MAT.MatGridListModule,
    MAT.MatCardModule,
    MAT.MatStepperModule,
    MAT.MatTabsModule,
    MAT.MatExpansionModule,
    MAT.MatButtonToggleModule,
    MAT.MatChipsModule,
    MAT.MatIconModule,
    MAT.MatProgressSpinnerModule,
    MAT.MatProgressBarModule,
    MAT.MatDialogModule,
    MAT.MatTooltipModule,
    MAT.MatSnackBarModule,
    MAT.MatTableModule,
    MAT.MatSortModule,
    MAT.MatPaginatorModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}

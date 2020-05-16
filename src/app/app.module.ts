import {BrowserModule, HammerModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {metaReducers} from './reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {httpInterceptorProviders} from 'src/app/_interceptors';
import {LayoutModule} from 'src/app/layout/layout.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AuthModule} from 'src/app/auth/auth.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {EffectsModule} from '@ngrx/effects';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HammerModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    AuthModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}) : [],
    EffectsModule.forRoot([]),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [
    httpInterceptorProviders,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

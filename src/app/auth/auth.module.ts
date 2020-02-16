import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import {RouterModule} from '@angular/router';
import {AuthRoutingModule} from 'src/app/auth/auth-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromError from 'src/app/auth/_store/_reducers/error.reducer';
import {errorFeatureKey} from 'src/app/auth/_store/_reducers/error.reducer';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(errorFeatureKey, fromError.reducer),
    AuthRoutingModule,
  ],
  exports: [LoginComponent]
})
export class AuthModule {
}

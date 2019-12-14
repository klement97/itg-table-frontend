import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RouterModule} from '@angular/router';
import {AuthRoutingModule} from 'src/app/auth/auth-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromError from 'src/app/auth/_store/_reducers/error.reducer';
import {errorFeatureKey} from 'src/app/auth/_store/_reducers/error.reducer';

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		RouterModule,
		MatSelectModule,
		AuthRoutingModule,
		MatProgressSpinnerModule,
		StoreModule.forFeature(errorFeatureKey, fromError.reducer),
	],
	exports: [LoginComponent]
})
export class AuthModule {
}

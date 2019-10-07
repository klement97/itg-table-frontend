import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSelectModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {AuthRoutingModule} from 'src/app/auth/auth-routing.module';


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
	],
	exports: [LoginComponent]
})
export class AuthModule {
}

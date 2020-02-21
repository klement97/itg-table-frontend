import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from '@src/app/auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {RouterModule} from '@angular/router';
import {AuthRoutingModule} from 'src/app/auth/auth-routing.module';

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
    AuthRoutingModule,
  ],
  exports: [LoginComponent]
})
export class AuthModule {
}

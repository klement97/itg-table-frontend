import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderPageComponent} from 'src/app/order/order-page/order-page.component';
import {OrderFormComponent} from 'src/app/order/order-form/order-form.component';
import {LoginComponent} from 'src/app/auth/login/login.component';


// const routes: Routes = [
// 	{path: '', redirectTo: 'auth/login', pathMatch: 'full'},
// ];

const routes: Routes = [
	{path: '', redirectTo: 'auth/login', pathMatch: 'full'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}

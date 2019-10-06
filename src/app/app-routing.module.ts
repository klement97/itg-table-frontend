import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderPageComponent} from 'src/app/order/order-page/order-page.component';
import {OrderFormComponent} from 'src/app/order/order-form/order-form.component';
import {LoginComponent} from 'src/app/auth/login/login.component';


const routes: Routes = [
	{path: '', redirectTo: 'tables', pathMatch: 'full'},
	{path: 'tables', component: OrderPageComponent, pathMatch: 'full'},
	{path: 'order/form', component: OrderFormComponent, pathMatch: 'full'},
	{path: 'auth/login', component: LoginComponent, pathMatch: 'full'},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}

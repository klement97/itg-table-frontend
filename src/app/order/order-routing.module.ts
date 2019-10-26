import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderPageComponent} from 'src/app/order/order-page/order-page.component';
import {OrderFormComponent} from 'src/app/order/order-form/order-form.component';
import {OrderListComponent} from 'src/app/order/order-list/order-list.component';

const routes: Routes = [
	{path: 'order/tables', component: OrderPageComponent, pathMatch: 'full'},
	{path: 'order/form', component: OrderFormComponent, pathMatch: 'full'},
	{path: 'order/list', component: OrderListComponent, pathMatch: 'full'},

	{path: '', redirectTo: 'order/tables', pathMatch: 'full'},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class OrderRoutingModule {
}

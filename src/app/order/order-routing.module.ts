import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderPageComponent} from 'src/app/order/order-page/order-page.component';
import {OrderFormComponent} from 'src/app/order/order-form/order-form.component';
import {OrderListComponent} from 'src/app/order/order-list/order-list.component';

const routes: Routes = [
  {path: 'order/tables', component: OrderPageComponent, pathMatch: 'full', data: {animation: 'Home'}},
  {path: 'order/tables/:order_id', component: OrderPageComponent, pathMatch: 'full', data: {animation: 'Home'}},

  {path: 'order/form', component: OrderFormComponent, pathMatch: 'full', data: {animation: 'Contact'}},
  {path: 'order/form/:order_id', component: OrderFormComponent, pathMatch: 'full', data: {animation: 'Contact'}},

  {path: 'order/list', component: OrderListComponent, pathMatch: 'full', data: {animation: 'About'}},

  {path: '', redirectTo: 'order/tables', pathMatch: 'full', data: {animation: 'Home'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}

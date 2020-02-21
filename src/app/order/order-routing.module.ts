import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderPageComponent} from 'src/app/order/order-page/order-page.component';
import {OrderFormComponent} from 'src/app/order/order-form/order-form.component';
import {OrderListComponent} from 'src/app/order/order-list/order-list.component';
import {AuthGuard} from '@src/app/auth/auth.guard';

const routes: Routes = [
  {
    path: 'order', canActivate: [AuthGuard],
    children: [
      {path: 'tables', component: OrderPageComponent, pathMatch: 'full'},
      {path: 'tables/:order_id', component: OrderPageComponent, pathMatch: 'full'},
      {path: 'form', component: OrderFormComponent, pathMatch: 'full'},
      {path: 'form/:order_id', component: OrderFormComponent, pathMatch: 'full'},
      {path: 'list', component: OrderListComponent, pathMatch: 'full'},
    ]
  },
  {path: '', redirectTo: 'order/tables', pathMatch: 'full', data: {animation: 'Home'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderPageComponent} from 'src/app/order/_components/order-page/order-page.component';
import {OrderFormComponent} from 'src/app/order/_components/order-form/order-form.component';
import {OrderListComponent} from 'src/app/order/_components/order-list/order-list.component';
import {AuthGuard} from '../auth/auth.guard';
import {InvoiceComponent} from './_components/invoice/invoice.component';


const routes: Routes = [
  {
    path: 'order', canActivate: [AuthGuard],
    children: [
      {path: 'tables', component: OrderPageComponent, pathMatch: 'full'},
      {path: 'tables/:order_id', component: OrderPageComponent, pathMatch: 'full'},
      {path: 'form', component: OrderFormComponent, pathMatch: 'full'},
      {path: 'form/:order_id', component: OrderFormComponent, pathMatch: 'full'},
      {path: 'list', component: OrderListComponent, pathMatch: 'full'},
      {path: 'list/:order_id/invoice', component: InvoiceComponent, pathMatch: 'full'},
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

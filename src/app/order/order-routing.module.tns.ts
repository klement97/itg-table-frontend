import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {NativeScriptRouterModule} from 'nativescript-angular/router';
import {OrderPageComponent} from '@src/app/order/order-page/order-page.component';
import {OrderFormComponent} from '@src/app/order/order-form/order-form.component';
import {OrderListComponent} from '@src/app/order/order-list/order-list.component';


const routes: Routes = [
  {
    path: 'order',
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
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class OrderRoutingModule {
}

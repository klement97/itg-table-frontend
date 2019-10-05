import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderPageComponent} from "src/app/order/order-page/order-page.component";
import {TableFormComponent} from "src/app/order/table-form/table-form.component";


const routes: Routes = [
  {path: 'tables', component: OrderPageComponent},
  {path: 'address/form', component: TableFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from 'src/app/auth/login/login.component';

const routes: Routes = [
	{
		path: 'auth/login', component: LoginComponent, pathMatch: 'full',
		data: {showHeader: false, showSidebar: false}
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {
}

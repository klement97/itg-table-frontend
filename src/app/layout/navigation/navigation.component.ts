import {Component, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {MatDialog, MatSidenav} from '@angular/material';
import {Store} from '@ngrx/store';
import {OrderUnitState} from 'src/app/order/_store/_reducers/order-unit.reducer';
import {selectOrderCount} from 'src/app/order/_store/_selectors/order-unit.selectors';
import {AuthService} from 'src/app/auth/_services/auth.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
	cartCount$: Observable<number>;
	@ViewChild('drawer', {static: true}) drawer: MatSidenav;

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			share()
		);

	constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog, private store: Store<OrderUnitState>,
							private auth: AuthService, private router: Router) {
		this.cartCount$ = store.select(selectOrderCount);
		router.events.subscribe(_ => this.drawer.close());
	}

	logout() {
		this.auth.logout().subscribe();
	}
}

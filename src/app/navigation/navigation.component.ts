import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {Store} from '@ngrx/store';
import {OrderUnitState} from 'src/app/order/_store/_reducers/order-unit.reducer';
import {selectOrderCount} from 'src/app/order/_store/_selectors/order-unit.selectors';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
	cartCount$: Observable<number>;

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			share()
		);

	constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private store: Store<OrderUnitState>) {
		this.cartCount$ = store.select(selectOrderCount);
	}
}

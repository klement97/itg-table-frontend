import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {OrderUnit} from 'src/app/order/_store/_models/order-unit.model';
import {Store} from '@ngrx/store';
import {OrderUnitState, selectAllOrderUnits} from 'src/app/order/_store/_reducers/order-unit.reducer';
import {CartComponent} from 'src/app/order/cart/cart.component';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			share()
		);

	constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog) {
	}

	openCart() {
		this.dialog.open(CartComponent);
	}

}

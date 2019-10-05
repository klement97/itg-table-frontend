import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {OrderUnitState} from 'src/app/order/_store/_reducers/order-unit.reducer';
import {Observable} from 'rxjs';
import {OrderUnit} from 'src/app/order/_store/_models/order-unit.model';
import {selectOrderUnits} from 'src/app/order/_store/_selectors/order-unit.selectors';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	orderUnits$: Observable<OrderUnit[]>;

	constructor(private store: Store<OrderUnitState>) {
		this.orderUnits$ = store.select(selectOrderUnits);
	}

	ngOnInit() {
		this.orderUnits$.subscribe(u => console.log(u));
	}

}

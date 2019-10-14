import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from 'src/app/order/_store/_services/order.service';
import {catchError} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromOrder from 'src/app/order/_store/_reducers/order.reducer';
import * as OrderActions from 'src/app/order/_store/_actions/order.actions';
import {Observable, of} from 'rxjs';
import {MatPaginator} from '@angular/material';
import {Order} from 'src/app/order/_store/_models/order.models';
import {selectOrderList} from 'src/app/order/_store/_selectors/order.selectors';

@Component({
	selector: 'app-order-list',
	templateUrl: './order-list.component.html',
	styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
	@ViewChild('paginator', {static: true}) paginator: MatPaginator;
	count: number = 0;
	displayedColumns: string[] = ['customer', 'date_created', 'total_price', 'total_table_count', 'actions'];
	loading: boolean = true;

	orders$: Observable<Order[]>;

	constructor(private orderService: OrderService, private store: Store<fromOrder.State>) {
		this.orders$ = store.select(selectOrderList);
	}

	ngOnInit() {
		this.orderService.getOrderList(1).subscribe(response => {
			this.loading = false;
			this.count = response['count'];
			this.store.dispatch(OrderActions.loadOrders({orders: response['results']}));
			catchError(err => of(console.log('error: ', err)));
		});
	}

	openDetails(order: Order) {
		console.log('order: ', order);
	}

	updateOrder(order: Order) {
		console.log('updating order: ', order);
	}

	deleteOrder(id: number) {
		console.log('deleting order: ', id);
	}

}

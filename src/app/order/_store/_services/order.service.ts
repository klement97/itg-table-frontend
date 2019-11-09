import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Order} from 'src/app/order/_store/_models/order.models';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {OrderUnitState} from 'src/app/order/_store/_reducers/order-unit.reducer';
import {clearOrderUnits} from 'src/app/order/_store/_actions/order-unit.actions';

const API = `${environment.apiHost}`;
const TABLES_URL = `${API}/tables`;
const COLORS_URL = `${API}/colors`;
const ORDERS_URL = `${API}/orders`;
const ORDER_SEND_EMAIL_URL = `${ORDERS_URL}/send/mail`;

@Injectable({
	providedIn: 'root'
})
export class OrderService {

	constructor(private http: HttpClient, private router: Router, private store: Store<OrderUnitState>) {
	}

	getTables() {
		return this.http.get(`${TABLES_URL}/`);
	}

	getColors() {
		return this.http.get(`${COLORS_URL}/`);
	}

	createOrder(order: Order) {
		return this.http.post(`${ORDERS_URL}/`, order).pipe(
			map(() => {
				this.store.dispatch(clearOrderUnits());
				this.router.navigate(['order/tables']);
			}),
			catchError(err => of(console.log(err)))
		);
	}

	getOrderList(page: number) {
		return this.http.get(`${ORDERS_URL}/?page=${page}`);
	}

	sendOrderMail(to: string, order: Order) {
		return this.http.post(`${ORDER_SEND_EMAIL_URL}/`, {'to_email': to, 'order': order});
	}
}

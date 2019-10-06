import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Order} from 'src/app/order/_store/_models/order.models';

const API = `${environment.apiHost}`;
const TABLES_URL = `${API}/tables`;
const COLORS_URL = `${API}/colors`;
const ORDERS_URL = `${API}/orders`;

@Injectable({
	providedIn: 'root'
})
export class OrderService {

	constructor(private http: HttpClient) {
	}

	getTables() {
		return this.http.get(`${TABLES_URL}/`);
	}

	getColors() {
		return this.http.get(`${COLORS_URL}/`);
	}

	createOrder(order: Order) {
		return this.http.post(`${ORDERS_URL}/`, order);
	}
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Order} from 'src/app/order/_store/_models/order.models';
import {Observable} from 'rxjs';
import {buildQueryString} from 'src/app/order/const';

const API = `${environment.apiHost}`;
const TABLES_URL = `${API}/tables`;
const COLORS_URL = `${API}/colors`;
const ORDERS_URL = `${API}/orders`;
const ORDER_SEND_EMAIL_URL = `${ORDERS_URL}/send/mail`;

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

  updateOrder(order: Order) {
    return this.http.put(`${ORDERS_URL}/${order.id}/`, order);
  }

  getOrderList(page: number, ordering?: string, filter?) {
    return this.http.get(`${ORDERS_URL}/${buildQueryString(page, ordering, null, filter)}`);
  }

  getOrder(id: number): Observable<any> {
    return this.http.get(`${ORDERS_URL}/${id}/`);
  }

  deleteOrder(id: number) {
    return this.http.delete(`${ORDERS_URL}/${id}/`);
  }

  sendOrderMail(toEmails: string[], order: Order) {
    return this.http.post(`${ORDER_SEND_EMAIL_URL}/`, {to_emails: toEmails, order});
  }
}

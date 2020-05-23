import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Order} from 'src/app/order/_store/_models/order.models';
import {Observable} from 'rxjs';
import {APIResponse, buildQueryString, formatDateToString, MAX_TIME, MIN_TIME} from 'src/app/order/const';


const API = `${environment.apiHost}`;
const TABLES_URL = `${API}/tables`;
const COLORS_URL = `${TABLES_URL}/colors`;
const ORDERS_URL = `${API}/orders`;
const ORDER_SEND_EMAIL_URL = `${ORDERS_URL}/send/mail`;


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  helper = new Helper();

  constructor(private http: HttpClient) {
  }

  getTables(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${TABLES_URL}/`);
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

  getOrderList(page: number, filter: OrderFilter, ordering: string = ''): Observable<any> {
    const f = this.helper.formatOrderFilterDates(filter);
    return this.http.get(`${ORDERS_URL}/${buildQueryString(page, ordering, null, f)}`);
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${ORDERS_URL}/${id}/`);
  }

  deleteOrder(id: number) {
    return this.http.delete(`${ORDERS_URL}/${id}/`);
  }

  sendOrderMail(toEmails: string[], order: Order) {
    return this.http.post(`${ORDER_SEND_EMAIL_URL}/`, {to_emails: toEmails, order});
  }
}


class Helper {
  formatOrderFilterDates(filter: OrderFilter): OrderFilter {
    const f: OrderFilter = {...filter};
    f.date_created_before = f.date_created_before ? formatDateToString(f.date_created_before, MAX_TIME) : '';
    f.date_created_after = f.date_created_after ? formatDateToString(f.date_created_after, MIN_TIME) : '';
    return f;
  }
}


export class OrderFilter {
  id: number;
  customer: string;
  date_created_after: Date | string;
  date_created_before: Date | string;
}

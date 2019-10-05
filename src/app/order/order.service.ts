import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment";

const API = `${environment.apiHost}`;
const TABLES_URL = `${API}/tables`;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getTables() {
    return this.http.get(`${TABLES_URL}/`);
  }
}

import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {finalize, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

const API = `${environment.apiHost}`;
const AUTH = `${API}/auth`;
const USERS = `${AUTH}/users`;
const CURRENT_USER = `${USERS}/me`;
const TOKEN = `${AUTH}/token`;
export const LOGIN = `${TOKEN}/login`;
export const LOGOUT = `${TOKEN}/logout`;

export const _TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
  }


  login(username, password) {
    return this.http.post(`${LOGIN}/`, {username, password})
      .pipe(
        map((token: { auth_token: string }) => {
          if (token) {
            this.cookieService.set(_TOKEN, token.auth_token, 365, '', '', false, 'Lax');
            this.router.navigate(['order/tables']).then();
            return token;
          }
        })
      );
  }

  logout() {
    const token: string = this.cookieService.get(_TOKEN);
    return this.http.post(`${LOGOUT}/`, token).pipe(
      finalize(() => this.router.navigate(['/auth/login'])
        .then(() => this.cookieService.delete(_TOKEN))
      ));
  }

  getUserDetails() {
    return this.http.get(`${CURRENT_USER}/`);
  }
}

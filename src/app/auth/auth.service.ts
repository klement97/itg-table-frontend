import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Store} from '@ngrx/store';
import {clearUser, loadUser} from './_store/actions/auth.actions';


const API = `${environment.apiHost}`;
const AUTH = `${API}/auth`;
const USERS = `${AUTH}/users`;
const CURRENT_USER = `${USERS}/me`;
const TOKEN = `${AUTH}/token`;
export const LOGIN = `${TOKEN}/login`;
export const LOGOUT = `${TOKEN}/logout`;

export const _TOKEN = 'token';
export const _USER = 'itg_user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private store: Store
  ) {
  }


  login(username, password) {
    return this.http.post(`${LOGIN}/`, {username, password}).pipe(
      map((token: { auth_token: string }) => {
        if (token) {
          this.cookieService.set(_TOKEN, token.auth_token, 365, '/', '', false, 'Strict');
          this.getUserDetails().subscribe();
          this.router.navigate(['order/tables']).then();
          return token;
        }
      })
    );
  }

  logout() {
    const token: string = this.cookieService.get(_TOKEN);
    return this.http.post(`${LOGOUT}/`, token).pipe(
      map(() => {
          this.store.dispatch(clearUser());
          this.cookieService.delete(_TOKEN, '/');
          this.router.navigate(['/auth/login']).then();
        }
      ));
  }

  hasToken(): boolean {
    return this.cookieService.check(_TOKEN);
  }

  checkGuards(): boolean {
    if (this.hasToken()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']).then();
      return false;
    }
  }


  getUserDetails() {
    return this.http.get(`${CURRENT_USER}/`).pipe(
      map((user) => {
        this.cookieService.set(_USER, JSON.stringify(user));
        this.store.dispatch(loadUser({user}));
        return user;
      })
    );
  }
}

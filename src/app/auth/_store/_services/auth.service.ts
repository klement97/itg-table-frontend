import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

const API = `${environment.apiHost}`;
const AUTH = `${API}/auth`;
const USERS = `${AUTH}/users`;
const CURRENT_USER = `${USERS}/me`;
const TOKEN = `${AUTH}/token`;
const LOGIN = `${TOKEN}/login`;
const LOGOUT = `${TOKEN}/logout`;

export let isLoggedIn: boolean = false;
export const _TOKEN: string = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentTokenSubject: BehaviorSubject<string>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.currentTokenSubject = new BehaviorSubject<string>(this.cookieService.get(_TOKEN));
  }

  login(username, password) {
    return this.http.post(`${LOGIN}/`,
      {username, password}).pipe(
      map((token: { auth_token: string }) => {
        if (token) {
          this.cookieService.set(_TOKEN, token.auth_token, null, '', '', false, 'Lax');
          this.currentTokenSubject.next(token.auth_token);
          this.router.navigate(['order/tables']).then();
          isLoggedIn = true;
          return token;
        }
      })
    );
  }

  logout() {
    const token: string = this.cookieService.get(_TOKEN);
    return this.http.post(`${LOGOUT}/`, token).pipe(
      finalize(() => {
        this.router.navigate(['/auth/login']).then(
          () => {
            this.cookieService.delete(_TOKEN);
            isLoggedIn = false;
          }
        );
      })
    );

  }
}

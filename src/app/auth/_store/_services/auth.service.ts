import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User} from 'src/app/auth/_store/user.model';
import {finalize, map} from 'rxjs/operators';
import {Router} from '@angular/router';

const API = `${environment.apiHost}`;
const AUTH = `${API}/auth`;
const USERS = `${AUTH}/users`;
const CURRENT_USER = `${USERS}/me`;
const TOKEN = `${AUTH}/token`;
const LOGIN = `${TOKEN}/login`;
const LOGOUT = `${TOKEN}/logout`;

export let isLoggedIn: boolean = false;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentTokenSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentTokenSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
  }

  login(username, password) {
    return this.http.post(`${LOGIN}/`,
      {username, password}).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentTokenSubject.next(user['auth_token']);
          this.router.navigate(['order/tables']).then();
          isLoggedIn = true;
          return user;
        }
      })
    );
  }

  logout() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    return this.http.post(`${LOGOUT}/`, currentUser.auth_token).pipe(
      finalize(() => {
        this.router.navigate(['/auth/login']).then(
          () => {
            localStorage.clear();
            isLoggedIn = false;
          }
        );
      })
    );

  }

  userInfo() {
    return this.http.get(`${CURRENT_USER}/`);
  }
}

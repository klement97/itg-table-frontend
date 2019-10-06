import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from 'src/app/auth/user.model';
import {catchError, map} from 'rxjs/operators';

const API = `${environment.apiHost}`;
const AUTH = `${API}/auth`;
const USERS = `${AUTH}/users`;
const CURRENT_USER = `${USERS}/me`;
const TOKEN = `${AUTH}/token`;
const LOGIN = `${TOKEN}/login`;
const LOGOUT = `${TOKEN}/logout`;

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) {
		this.currentTokenSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.CURRENT_TOKEN)));
		this.currentToken = this.currentTokenSubject.asObservable();
	}

	private readonly CURRENT_TOKEN = 'user';
	private readonly CURRENT_USERNAME = 'username';

	private currentTokenSubject: BehaviorSubject<User>;
	public currentToken: Observable<User>;

	public getCurrentTokenValue(): User {
		return this.currentTokenSubject.value;
	}

	login(username, password) {
		return this.http.post(`${LOGIN}/`,
			{username, password}).pipe(
			map(user => {
				if (user) {
					localStorage.setItem('user', JSON.stringify(user));
					this.currentTokenSubject.next(user['user'].accessToken);
					return user;
				}
			}),
			catchError(err => of(console.log(err)))
		);
	}

	logout(token) {
		this.http.post(`${LOGOUT}/`, token);
	}
}

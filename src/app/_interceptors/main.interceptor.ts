import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {_TOKEN} from '../auth/auth.service';
import {NO_TOKEN_ENDPOINTS} from './endpoints';
import {Router} from '@angular/router';

@Injectable()
export class InterceptService implements HttpInterceptor {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (NO_TOKEN_ENDPOINTS.includes(request.url)) {
      return next.handle(request);
    }

    const token: string = this.cookieService.get(_TOKEN);
    if (token) {
      request = request.clone({setHeaders: {Authorization: `Token ${token}`}});
    }


    return next.handle(request)
      .pipe(
        catchError(err => {
          if (err.error?.detail === 'Invalid token.') {
            this.router.navigate(['/auth/login']).then(
              () => this.cookieService.delete(_TOKEN)
            );
          }
          return throwError(err);
        })
      );
  }
}

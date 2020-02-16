import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  private userToken: string;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      this.userToken = currentUser.auth_token;
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${this.userToken}`
        }
      });
    } else {
    }


    return next.handle(request);
  }
}

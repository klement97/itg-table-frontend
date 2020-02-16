import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromError from 'src/app/auth/_store/_reducers/error.reducer';
import * as ErrorActions from 'src/app/auth/_store/_actions/error.actions';

@Injectable()
export class InterceptService implements HttpInterceptor {
  private userToken: string;

  constructor(private store: Store<fromError.State>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      this.userToken = currentUser.access;
      this.store.dispatch(ErrorActions.clearError());
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${this.userToken}`
        }
      });
    } else {
    }


    return next.handle(request)
      .pipe(
        catchError(err => {
          console.log(err);
          this.store.dispatch(ErrorActions.loadError({error: err}));
          return throwError(err);
        })
      );
  }
}

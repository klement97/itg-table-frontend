// import {Injectable} from "@angular/core";
// import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
// import {Observable} from "rxjs";
//
// @Injectable()
// export class InterceptService implements HttpInterceptor {
//
//   private userToken: string;
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // tslint:disable-next-line:no-debugger
//     const currentUser = JSON.parse(localStorage.getItem('user'));
//     if (currentUser) {
//       this.userToken = currentUser.access;
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${this.userToken}`
//         }
//       });
//     } else {
//     }
//
//
//     return next.handle(request);
//   }
// }

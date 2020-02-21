import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {InterceptService} from '@src/app/_interceptors/main.interceptor';

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true},
];

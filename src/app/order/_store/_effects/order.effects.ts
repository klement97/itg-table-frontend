import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {OrderService} from '../_services/order.service';
import {getOrders, getOrdersSuccess} from '../_actions/order.actions';
import {map, switchMap} from 'rxjs/operators';


@Injectable()
export class OrderEffects {

  getOrders$ = createEffect(() => this.actions$.pipe(
    ofType(getOrders),
    switchMap((payload) => this.orderService.getOrderList(payload.page, '', payload.filter).pipe(
      map((res) => getOrdersSuccess({orders: res.data, count: res.pagination.count}))
    ))
  ));

  constructor(private actions$: Actions, private orderService: OrderService) {}

}

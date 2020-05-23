import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {OrderService} from '../_services/order.service';
import {getOrder, getOrderFailure, getOrders, getOrdersSuccess, getOrderSuccess} from '../_actions/order.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {getTables, getTablesSuccess} from '../_actions/table.actions';
import {of} from 'rxjs';


@Injectable()
export class OrderEffects {

  getOrder$ = createEffect(() => this.actions$.pipe(
    ofType(getOrder),
    switchMap(({id}) => this.orderService.getOrder(id).pipe(
      map((order) => getOrderSuccess({order})),
      catchError((err) => of(getOrderFailure({error: err.error})))
    ))
  ));

  getOrders$ = createEffect(() => this.actions$.pipe(
    ofType(getOrders),
    switchMap(({page, filter, ordering}) => {
      return this.orderService.getOrderList(page, filter, ordering).pipe(
        map(({data, pagination}) => getOrdersSuccess({orders: data, count: pagination.count}))
      );
    })
  ));

  getTables$ = createEffect(() => this.actions$.pipe(
    ofType(getTables),
    switchMap(() => this.orderService.getTables().pipe(
      map(({data, pagination}) => getTablesSuccess({tables: data, count: pagination.count}))
    ))
  ));

  constructor(private actions$: Actions, private orderService: OrderService) {}

}

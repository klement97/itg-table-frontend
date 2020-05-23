import {createAction, props} from '@ngrx/store';

import {Order} from 'src/app/order/_store/_models/order.models';
import {OrderFilter} from '../_services/order.service';


export const getOrder = createAction(
  '[Order Invoice] Get Order',
  props<{ id: number }>()
);

export const getOrderSuccess = createAction(
  '[Order/API] Get Order Success',
  props<{ order: Order }>()
);

export const getOrderFailure = createAction(
  '[Order/API] Get Order Failure',
  props<{ error }>()
);

export const getOrders = createAction(
  '[Order List] Get Orders',
  props<{ page: number, filter: OrderFilter, ordering: string }>()
);

export const getOrdersSuccess = createAction(
  '[Order/API] Get Orders Success',
  props<{ orders: Order[], count: number }>()
);

export const addOrderForUpdate = createAction(
  '[Order/Page] Add Order For Update',
  props<{ order: Order }>()
);

export const markUpdateAsTrue = createAction(
  '[Order List] Mark Update As True',
  props<{ orderId: number }>()
);

export const deleteOrder = createAction(
  '[Order/API] Delete Order',
  props<{ id: number }>()
);

export const clearOrders = createAction(
  '[Order/API] Clear Orders'
);

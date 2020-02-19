import {createAction, props} from '@ngrx/store';

import {Order} from 'src/app/order/_store/_models/order.models';

export const loadOrders = createAction(
  '[Order/API] Load Orders',
  props<{ orders: Order[] }>()
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

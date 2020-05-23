import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromOrder from 'src/app/order/_store/_reducers/order.reducer';
import {ordersFeatureKey, selectAllOrderEntities, selectAllOrders} from 'src/app/order/_store/_reducers/order.reducer';


export const selectOrderState = createFeatureSelector<fromOrder.State>(ordersFeatureKey);

export const selectOrderList = createSelector(
  selectOrderState,
  selectAllOrders
);

export const selectOrderEntities = createSelector(
  selectOrderState,
  selectAllOrderEntities
);

export const selectOrderListCount = createSelector(
  selectOrderState,
  state => state.count
);

export const selectOrdersLoading = createSelector(
  selectOrderState,
  state => state.loading
);

export const selectUpdateOrderId = createSelector(
  selectOrderState,
  state => state.updateOrderId
);

export const selectOrder = createSelector(
  selectOrderState,
  state => state.order
);

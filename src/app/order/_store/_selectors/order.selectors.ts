import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromOrder from 'src/app/order/_store/_reducers/order.reducer';
import {ordersFeatureKey, selectAllOrders} from 'src/app/order/_store/_reducers/order.reducer';

export const selectOrderState = createFeatureSelector<fromOrder.State>(ordersFeatureKey);

export const selectOrderList = createSelector(
	selectOrderState,
	selectAllOrders
);

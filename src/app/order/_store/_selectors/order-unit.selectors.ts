import {createFeatureSelector, createSelector} from '@ngrx/store';
import {
  orderUnitsFeatureKey,
  OrderUnitState,
  selectAllOrderUnits,
  selectCountOrderUnits,
  selectIdsOrderUnit
} from 'src/app/order/_store/_reducers/order-unit.reducer';

export const selectOrderUnitState = createFeatureSelector<OrderUnitState>(orderUnitsFeatureKey);

export const selectOrderUnits = createSelector(
	selectOrderUnitState,
	selectAllOrderUnits
);

export const selectOrderCount = createSelector(
	selectOrderUnitState,
	selectCountOrderUnits,
);

export const selectOrderUnitIds = createSelector(
	selectOrderUnitState,
	selectIdsOrderUnit
);

export const selectFakeId = createSelector(
	selectOrderUnitState,
	state => state.fakeId
);

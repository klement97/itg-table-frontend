import {createFeatureSelector, createSelector} from '@ngrx/store';
import {
	orderUnitsFeatureKey,
	OrderUnitState,
	selectAllOrderUnits,
	selectCountOrderUnits
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

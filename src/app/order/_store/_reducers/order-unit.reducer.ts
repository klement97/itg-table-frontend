import {Action, createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {OrderUnit} from 'src/app/order/_store/_models/order-unit.model';
import * as OrderUnitActions from 'src/app/order/_store/_actions/order-unit.actions';

export const orderUnitsFeatureKey = 'orderUnits';

export interface OrderUnitState extends EntityState<OrderUnit> {
}

export const adapter: EntityAdapter<OrderUnit> = createEntityAdapter<OrderUnit>();

export const initialState: OrderUnitState = adapter.getInitialState({});

const orderUnitReducer = createReducer(
	initialState,
	on(OrderUnitActions.addOrderUnit,
		(state, action) => adapter.addOne(action.orderUnit, state)
	),
	on(OrderUnitActions.upsertOrderUnit,
		(state, action) => adapter.upsertOne(action.orderUnit, state)
	),
	on(OrderUnitActions.addOrderUnits,
		(state, action) => adapter.addMany(action.orderUnits, state)
	),
	on(OrderUnitActions.upsertOrderUnits,
		(state, action) => adapter.upsertMany(action.orderUnits, state)
	),
	on(OrderUnitActions.updateOrderUnit,
		(state, action) => adapter.updateOne(action.orderUnit, state)
	),
	on(OrderUnitActions.updateOrderUnits,
		(state, action) => adapter.updateMany(action.orderUnits, state)
	),
	on(OrderUnitActions.deleteOrderUnit,
		(state, action) => adapter.removeOne(action.id, state)
	),
	on(OrderUnitActions.deleteOrderUnits,
		(state, action) => adapter.removeMany(action.ids, state)
	),
	on(OrderUnitActions.loadOrderUnits,
		(state, action) => adapter.addAll(action.orderUnits, state)
	),
	on(OrderUnitActions.clearOrderUnits,
		state => adapter.removeAll(state)
	),
);

export function reducer(state: OrderUnitState | undefined, action: Action) {
	return orderUnitReducer(state, action);
}

export const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = adapter.getSelectors();

export const selectAllOrderUnits = selectAll;
export const selectCountOrderUnits = selectTotal;
export const selectEntityOrderUnits = selectEntities;
export const selectIdsOrderUnit = selectIds;

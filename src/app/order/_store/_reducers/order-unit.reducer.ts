import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {OrderUnit} from 'src/app/order/_store/_models/order-unit.model';
import * as OrderUnitActions from 'src/app/order/_store/_actions/order-unit.actions';

export const orderUnitsFeatureKey = 'order-units';

export interface OrderUnitState extends EntityState<OrderUnit> {
  fakeId: number;
}

export const adapter: EntityAdapter<OrderUnit> = createEntityAdapter<OrderUnit>();

export const initialState: OrderUnitState = adapter.getInitialState({
  fakeId: 1,
});

export const orderUnitReducer = createReducer(
  initialState,
  on(OrderUnitActions.addOrderUnit,
    (state, action) => adapter.addOne(action.orderUnit, {...state, fakeId: state.fakeId + 1})
  ),
  on(OrderUnitActions.updateOrderUnit,
    (state, action) => adapter.updateOne(action.orderUnit, state)
  ),
  on(OrderUnitActions.deleteOrderUnit,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(OrderUnitActions.loadOrderUnits,
    (state, action) => adapter.addAll(action.orderUnits, state)
  ),
  on(OrderUnitActions.clearOrderUnits,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectAllOrderUnits = selectAll;
export const selectCountOrderUnits = selectTotal;

import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Order} from 'src/app/order/_store/_models/order.models';
import * as OrderActions from 'src/app/order/_store/_actions/order.actions';


export const ordersFeatureKey = 'orders';


export interface State extends EntityState<Order> {
  update: boolean;
  updateOrderId: number;
  count: number;
  loading: boolean;
}


export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialState: State = adapter.getInitialState({
  update: false,
  updateOrderId: null,
  count: 0,
  loading: false,
});

const orderReducer = createReducer(
  initialState,
  on(OrderActions.getOrders,
    (state) => ({...state, loading: true})
  ),
  on(OrderActions.getOrdersSuccess,
    (state, action) => adapter.addAll(action.orders, {...state, count: action.count, loading: false})
  ),
  on(OrderActions.markUpdateAsTrue,
    (state, action) => ({...state, update: true, updateOrderId: action.orderId})
  ),
  on(OrderActions.addOrderForUpdate,
    (state, action) => adapter.addOne(action.order, {...state, update: true, updateOrderId: action.order.id})
  ),
  on(OrderActions.deleteOrder,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(OrderActions.clearOrders,
    state => adapter.removeAll(state)
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return orderReducer(state, action);
}

export const {
  selectEntities,
  selectAll
} = adapter.getSelectors();

export const selectAllOrders = selectAll;
export const selectAllOrderEntities = selectEntities;

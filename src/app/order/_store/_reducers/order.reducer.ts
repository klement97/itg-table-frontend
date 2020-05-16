import {createReducer, on} from '@ngrx/store';
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

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.getOrders,
    state => ({...state, loading: true})
  ),
  on(OrderActions.getOrdersSuccess,
    (state, {orders, count}) => adapter.addAll(orders, {...state, count, loading: false})
  ),
  on(OrderActions.markUpdateAsTrue,
    (state, {orderId}) => ({...state, update: true, updateOrderId: orderId})
  ),
  on(OrderActions.addOrderForUpdate,
    (state, {order}) => adapter.addOne(order, {...state, update: true, updateOrderId: order.id})
  ),
  on(OrderActions.deleteOrder,
    (state, {id}) => adapter.removeOne(id, {...state, count: state.count - 1})
  ),
  on(OrderActions.clearOrders,
    state => adapter.removeAll({...state, count: 0})
  ),
);

export const {
  selectEntities,
  selectAll
} = adapter.getSelectors();

export const selectAllOrders = selectAll;
export const selectAllOrderEntities = selectEntities;

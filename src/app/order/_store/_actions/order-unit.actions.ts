import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';

import {OrderUnit} from 'src/app/order/_store/_models/order-unit.model';

export const loadOrderUnits = createAction(
  '[OrderUnit/API] Load OrderUnits',
  props<{ orderUnits: OrderUnit[] }>()
);

export const addOrderUnit = createAction(
  '[OrderUnit/API] Add OrderUnit',
  props<{ orderUnit: OrderUnit }>()
);

export const updateOrderUnit = createAction(
  '[OrderUnit/API] Update OrderUnit',
  props<{ orderUnit: Update<OrderUnit> }>()
);

export const deleteOrderUnit = createAction(
  '[OrderUnit/API] Delete OrderUnit',
  props<{ id: string }>()
);

export const clearOrderUnits = createAction(
  '[OrderUnit/API] Clear OrderUnits'
);

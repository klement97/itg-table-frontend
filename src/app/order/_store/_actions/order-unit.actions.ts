import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { OrderUnit } from 'src/app/order/_store/_models/order-unit.model';

export const loadOrderUnits = createAction(
  '[OrderUnit/API] Load OrderUnits', 
  props<{ orderUnits: OrderUnit[] }>()
);

export const addOrderUnit = createAction(
  '[OrderUnit/API] Add OrderUnit',
  props<{ orderUnit: OrderUnit }>()
);

export const upsertOrderUnit = createAction(
  '[OrderUnit/API] Upsert OrderUnit',
  props<{ orderUnit: OrderUnit }>()
);

export const addOrderUnits = createAction(
  '[OrderUnit/API] Add OrderUnits',
  props<{ orderUnits: OrderUnit[] }>()
);

export const upsertOrderUnits = createAction(
  '[OrderUnit/API] Upsert OrderUnits',
  props<{ orderUnits: OrderUnit[] }>()
);

export const updateOrderUnit = createAction(
  '[OrderUnit/API] Update OrderUnit',
  props<{ orderUnit: Update<OrderUnit> }>()
);

export const updateOrderUnits = createAction(
  '[OrderUnit/API] Update OrderUnits',
  props<{ orderUnits: Update<OrderUnit>[] }>()
);

export const deleteOrderUnit = createAction(
  '[OrderUnit/API] Delete OrderUnit',
  props<{ id: string }>()
);

export const deleteOrderUnits = createAction(
  '[OrderUnit/API] Delete OrderUnits',
  props<{ ids: string[] }>()
);

export const clearOrderUnits = createAction(
  '[OrderUnit/API] Clear OrderUnits'
);

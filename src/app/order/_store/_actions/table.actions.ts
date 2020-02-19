import {createAction, props} from '@ngrx/store';

import {Table} from 'src/app/order/_store/_models/table.model';

export const loadTables = createAction(
  '[Table/API] Load Tables',
  props<{ tables: Table[] }>()
);

export const addTables = createAction(
  '[Table/API] Add Tables',
  props<{ tables: Table[] }>()
);

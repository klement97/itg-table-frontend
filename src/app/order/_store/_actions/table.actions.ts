import {createAction, props} from '@ngrx/store';

import {Table} from 'src/app/order/_store/_models/table.model';


export const getTables = createAction(
  '[Table List] Get All Tables'
);

export const getTablesSuccess = createAction(
  '[Table/API] Get Tables Success',
  props<{ tables: Table[], count: number }>()
);

export const addTables = createAction(
  '[Table/API] Add Tables',
  props<{ tables: Table[] }>()
);

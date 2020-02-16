import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';

import {Table} from 'src/app/order/_store/_models/table.model';

export const loadTables = createAction(
  '[Table/API] Load Tables',
  props<{ tables: Table[] }>()
);

export const addTable = createAction(
  '[Table/API] Add Table',
  props<{ table: Table }>()
);

export const upsertTable = createAction(
  '[Table/API] Upsert Table',
  props<{ table: Table }>()
);

export const addTables = createAction(
  '[Table/API] Add Tables',
  props<{ tables: Table[] }>()
);

export const upsertTables = createAction(
  '[Table/API] Upsert Tables',
  props<{ tables: Table[] }>()
);

export const updateTable = createAction(
  '[Table/API] Update Table',
  props<{ table: Update<Table> }>()
);

export const updateTables = createAction(
  '[Table/API] Update Tables',
  props<{ tables: Update<Table>[] }>()
);

export const deleteTable = createAction(
  '[Table/API] Delete Table',
  props<{ id: string }>()
);

export const deleteTables = createAction(
  '[Table/API] Delete Tables',
  props<{ ids: string[] }>()
);

export const clearTables = createAction(
  '[Table/API] Clear Tables'
);

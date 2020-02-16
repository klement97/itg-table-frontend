import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Table} from 'src/app/order/_store/_models/table.model';
import * as TableActions from 'src/app/order/_store/_actions/table.actions';

export const tablesFeatureKey = 'tables';

export interface State extends EntityState<Table> {
}

export const adapter: EntityAdapter<Table> = createEntityAdapter<Table>();

export const initialState: State = adapter.getInitialState({});

const tableReducer = createReducer(
  initialState,
  on(TableActions.addTable,
    (state, action) => adapter.addOne(action.table, state)
  ),
  on(TableActions.upsertTable,
    (state, action) => adapter.upsertOne(action.table, state)
  ),
  on(TableActions.addTables,
    (state, action) => adapter.addMany(action.tables, state)
  ),
  on(TableActions.upsertTables,
    (state, action) => adapter.upsertMany(action.tables, state)
  ),
  on(TableActions.updateTable,
    (state, action) => adapter.updateOne(action.table, state)
  ),
  on(TableActions.updateTables,
    (state, action) => adapter.updateMany(action.tables, state)
  ),
  on(TableActions.deleteTable,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(TableActions.deleteTables,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(TableActions.loadTables,
    (state, action) => adapter.addAll(action.tables, state)
  ),
  on(TableActions.clearTables,
    state => adapter.removeAll(state)
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return tableReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectAllTables = selectAll;
export const selectCountTables = selectTotal;

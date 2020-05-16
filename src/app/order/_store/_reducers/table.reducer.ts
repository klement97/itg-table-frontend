import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Table} from 'src/app/order/_store/_models/table.model';
import * as TableActions from 'src/app/order/_store/_actions/table.actions';


export const tablesFeatureKey = 'tables';


export interface State extends EntityState<Table> {
  count: number;
  loading: boolean;
}


export const adapter: EntityAdapter<Table> = createEntityAdapter<Table>();

export const initialState: State = adapter.getInitialState({
  count: 0,
  loading: false,
});

export const tableReducer = createReducer(
  initialState,
  on(TableActions.addTables,
    (state, {tables}) => adapter.addMany(tables, state)
  ),
  on(TableActions.getTables,
    state => ({...state, loading: true})
  ),
  on(TableActions.getTablesSuccess,
    (state, {tables, count}) => adapter.addAll(tables, {...state, count})
  ),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectAllTables = selectAll;
export const selectCountTables = selectTotal;

import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTables from 'src/app/order/_store/_reducers/table.reducer';
import {selectAllTables} from 'src/app/order/_store/_reducers/table.reducer';


export const selectTablesState = createFeatureSelector<fromTables.State>(fromTables.tablesFeatureKey);

export const selectTables = createSelector(
  selectTablesState,
  selectAllTables
);

export const selectTablesLoading = createSelector(
  selectTablesState,
  state => state.loading
);

export const selectTablesCount = createSelector(
  selectTablesState,
  state => state.count
);

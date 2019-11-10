import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromError from 'src/app/auth/_store/_reducers/error.reducer';

export const selectErrorState = createFeatureSelector<fromError.State>(fromError.errorFeatureKey);

export const selectHasError = createSelector(
    selectErrorState,
    state => state.hasError
);

export const selectError = createSelector(
    selectErrorState,
    state => state.error
);

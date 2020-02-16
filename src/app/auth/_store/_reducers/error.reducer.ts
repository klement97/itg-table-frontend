import {Action, createReducer, on} from '@ngrx/store';
import * as ErrorActions from 'src/app/auth/_store/_actions/error.actions';

export const errorFeatureKey = 'error';

export interface State {
  hasError: boolean;
  error: any;
}

export const initialState: State = {
  hasError: false,
  error: null,
};

const errorReducer = createReducer(
  initialState,

  on(ErrorActions.loadError,
    (state, action) => ({...state, error: action.error, hasError: true})
  ),
  on(ErrorActions.clearError,
    state => ({...state, error: null, hasError: false})
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return errorReducer(state, action);
}

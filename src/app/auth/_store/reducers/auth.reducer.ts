import {createReducer, on} from '@ngrx/store';
import {clearUser, loadUser} from '../actions/auth.actions';


export const authFeatureKey = 'auth';


export interface State {
  user: any;
}


export const initialState: State = {
  user: null,
};


export const reducer = createReducer(
  initialState,
  on(loadUser,
    (state, {user}) => ({...state, user})
  ),
  on(clearUser,
    state => ({...state, user: null})
  )
);


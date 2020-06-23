import {createAction, props} from '@ngrx/store';


export const loadUser = createAction(
  '[Auth] Load User',
  props<{ user }>()
);

export const clearUser = createAction(
  '[Auth] Clear User'
);

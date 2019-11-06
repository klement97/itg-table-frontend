import {createAction, props} from '@ngrx/store';

export const loadError = createAction(
	'[Error] Load Errors',
	props<{ error }>()
);

export const clearError = createAction(
	'[Error] Load Errors'
);

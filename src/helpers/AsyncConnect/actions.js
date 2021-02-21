import { createAction } from 'redux-actions';

export const clearKey = createAction('@redux-conn/CLEAR');
export const beginGlobalLoad = createAction('@redux-conn/BEGIN_GLOBAL_LOAD');
export const endGlobalLoad = createAction('@redux-conn/END_GLOBAL_LOAD');
export const load = createAction('@redux-conn/LOAD', (key) => ({ key }));
export const loadSuccess = createAction(
  '@redux-conn/LOAD_SUCCESS',
  (key, data) => {
    return { key, data };
  },
);
export const loadFail = createAction('@redux-conn/LOAD_FAIL', (key, error) => ({
  key,
  error,
}));

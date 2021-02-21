export function clearKey(key) {
  return {
    type: '@redux-conn/CLEAR',
    key,
  };
}

export function beginGlobalLoad() {
  return {
    type: '@redux-conn/BEGIN_GLOBAL_LOAD',
  };
}

export function endGlobalLoad() {
  return {
    type: '@redux-conn/END_GLOBAL_LOAD',
  };
}

export function load(key) {
  return {
    type: '@redux-conn/LOAD',
    key,
  };
}

export function loadSuccess(key, data) {
  return {
    type: '@redux-conn/LOAD_SUCCESS',
    key,
    data,
  };
}

export function loadFail(key, error) {
  return {
    type: '@redux-conn/LOAD_FAIL',
    key,
    error,
  };
}

// export const clearKey = createAction('@redux-conn/CLEAR');
// export const beginGlobalLoad = createAction('@redux-conn/BEGIN_GLOBAL_LOAD');
// export const endGlobalLoad = createAction('@redux-conn/END_GLOBAL_LOAD');
// export const load = createAction('@redux-conn/LOAD', (key) => ({ key }));
// export const loadSuccess = createAction(
//   '@redux-conn/LOAD_SUCCESS',
//   (key, data) => {
//     return { key, data };
//   },
// );
// export const loadFail = createAction('@redux-conn/LOAD_FAIL', (key, error) => ({
//   key,
//   error,
// }));

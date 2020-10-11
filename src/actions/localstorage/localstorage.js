import {
  GET_LOCALSTORAGE,
  SET_LOCALSTORAGE,
  UNSET_LOCALSTORAGE,
  CLEAR_LOCALSTORAGE,
} from '@plone/volto/constants/ActionTypes';

export function getLocalStorage(key) {
  return {
    type: GET_LOCALSTORAGE,
    key,
  };
}

export function setLocalStorage(key, value) {
  return {
    type: SET_LOCALSTORAGE,
    key,
    value,
  };
}

export function unsetLocalStorage(key) {
  return {
    type: UNSET_LOCALSTORAGE,
    key,
  };
}

export function clearLocalStorage() {
  return {
    type: CLEAR_LOCALSTORAGE,
  };
}

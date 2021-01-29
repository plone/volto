import { LOAD_LAZY_LIBRARY } from '@plone/volto/constants/ActionTypes';

export function loadLazyLibrary(libName, libModule) {
  return {
    type: LOAD_LAZY_LIBRARY,
    libName,
    libModule,
  };
}

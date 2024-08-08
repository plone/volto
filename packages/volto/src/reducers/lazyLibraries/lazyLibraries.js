import { LOAD_LAZY_LIBRARY } from '@plone/volto/constants/ActionTypes';

const initialState = {};

export default function lazyLibraries(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_LAZY_LIBRARY:
      const { libName, libModule } = action;
      return {
        ...state,
        [libName]: libModule,
      };
    default:
      return state;
  }
}

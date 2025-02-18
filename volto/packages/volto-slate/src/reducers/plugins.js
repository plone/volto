const initialState = {};

export default function slate_plugins(state = initialState, action = {}) {
  const { type, pluginId, ...rest } = action;
  switch (type) {
    case 'SLATE_PLUGINS':
      return {
        ...state,
        [pluginId]: {
          ...state[pluginId],
          ...rest,
        },
      };
    default:
      return state;
  }
}

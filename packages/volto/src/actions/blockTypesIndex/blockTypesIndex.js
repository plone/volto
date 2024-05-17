import { GET_BLOCKTYPES_INDEX } from '../../constants/ActionTypes';

export function getBlockTypes(blocktypes) {
  return {
    type: GET_BLOCKTYPES_INDEX,
    request: {
      op: 'get',
      path: `/@blocktypes?blocktypes=${blocktypes}`,
    },
  };
}

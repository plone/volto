import { GET_BLOCKTYPES_INDEX } from '@plone/volto/constants/ActionTypes';

export function getBlockTypes(
  id: string | null = null,
  path: string | null = null,
) {
  let requestPath = '/@blocktypes';

  if (id) {
    requestPath += `/${id}`;
  }

  if (id && path) {
    requestPath += `?path=${path}`;
  }

  return {
    type: GET_BLOCKTYPES_INDEX,
    request: {
      op: 'get',
      path: requestPath,
    },
  };
}

import { GET_LINKINTEGRITY } from '@plone/volto/constants/ActionTypes';

export function getLinkintegrity(uids) {
  return {
    type: GET_LINKINTEGRITY,
    request: {
      op: 'post',
      path: `/@linkintegrity`,
      data: { uids: [...uids] },
    },
    data: {
      something: 'something',
    },
  };
}

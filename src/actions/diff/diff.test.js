import { GET_DIFF } from '@plone/volto/constants/ActionTypes';
import { getDiff } from './diff';

describe('Diff action', () => {
  describe('getDiff', () => {
    it('should create an action to get a diff', () => {
      const url = 'http://127.0.0.1';
      const one = '1';
      const two = '2';
      const action = getDiff(url, one, two);

      expect(action.type).toEqual(GET_DIFF);
      expect(action.request[0].op).toEqual('get');
      expect(action.request[0].path).toEqual(`${url}/@history/${one}`);
      expect(action.request[1].op).toEqual('get');
      expect(action.request[1].path).toEqual(`${url}/@history/${two}`);
    });
  });
});

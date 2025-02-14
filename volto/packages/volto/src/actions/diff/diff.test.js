import { getDiff } from './diff';
import { GET_DIFF } from '@plone/volto/constants/ActionTypes';

describe('Diff action', () => {
  describe('getDiff', () => {
    it('should create an action to get a diff', () => {
      const url = 'http://localhost';
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

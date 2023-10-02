import { GET_SITE } from '@plone/volto/constants/ActionTypes';
import { getSite } from './site';

describe('Site action', () => {
  describe('getSite', () => {
    it('should create an action to get the site config', () => {
      const url = 'http://127.0.0.1';
      const action = getSite(url);

      expect(action.type).toEqual(GET_SITE);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`/@site`);
    });
  });
});

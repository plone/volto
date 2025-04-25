import { getSite } from './site';
import { GET_SITE } from '@plone/volto/constants/ActionTypes';

describe('Site action', () => {
  describe('getSite', () => {
    it('should create an action to get the site config', () => {
      const url = 'http://localhost';
      const action = getSite(url);

      expect(action.type).toEqual(GET_SITE);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`/@site`);
    });
  });
});

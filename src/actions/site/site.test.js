import { getSite } from './site';
import { GET_SITE } from '@plone/volto/constants/ActionTypes';

describe('Breadcrumbs action', () => {
  describe('getBreadcrumbs', () => {
    it('should create an action to get the breadcrumbs', () => {
      const url = 'http://localhost';
      const action = getSite(url);

      expect(action.type).toEqual(GET_SITE);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@site`);
    });
  });
});

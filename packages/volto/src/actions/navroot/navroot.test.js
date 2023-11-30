import { getNavroot } from './navroot';
import { GET_NAVROOT } from '@plone/volto/constants/ActionTypes';

describe('Breadcrumbs action', () => {
  describe('getBreadcrumbs', () => {
    it('should create an action to get the breadcrumbs', () => {
      const url = 'http://localhost';
      const action = getNavroot(url);

      expect(action.type).toEqual(GET_NAVROOT);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@navroot`);
    });
  });
});

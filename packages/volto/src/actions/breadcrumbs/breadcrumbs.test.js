import { getBreadcrumbs } from './breadcrumbs';
import { GET_BREADCRUMBS } from '@plone/volto/constants/ActionTypes';

describe('Breadcrumbs action', () => {
  describe('getBreadcrumbs', () => {
    it('should create an action to get the breadcrumbs', () => {
      const url = 'http://localhost';
      const action = getBreadcrumbs(url);

      expect(action.type).toEqual(GET_BREADCRUMBS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@breadcrumbs`);
    });
  });
});

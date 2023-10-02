import { GET_BREADCRUMBS } from '@plone/volto/constants/ActionTypes';
import { getBreadcrumbs } from './breadcrumbs';

describe('Breadcrumbs action', () => {
  describe('getBreadcrumbs', () => {
    it('should create an action to get the breadcrumbs', () => {
      const url = 'http://127.0.0.1';
      const action = getBreadcrumbs(url);

      expect(action.type).toEqual(GET_BREADCRUMBS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@breadcrumbs`);
    });
  });
});

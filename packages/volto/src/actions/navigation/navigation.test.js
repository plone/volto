import { getNavigation } from './navigation';
import { GET_NAVIGATION } from '@plone/volto/constants/ActionTypes';

describe('Navigation action', () => {
  describe('getNavigation', () => {
    it('should create an action to get the navigation', () => {
      const url = 'http://localhost';
      const action = getNavigation(url);

      expect(action.type).toEqual(GET_NAVIGATION);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@navigation`);
    });

    it('should create an action to get the navigation with depth', () => {
      const url = 'http://localhost';
      const depth = 3;
      const action = getNavigation(url, depth);

      expect(action.type).toEqual(GET_NAVIGATION);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `${url}/@navigation?expand.navigation.depth=${depth}`,
      );
    });
  });
});

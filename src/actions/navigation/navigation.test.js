import { GET_NAVIGATION } from '@plone/volto/constants/ActionTypes';
import { getNavigation } from './navigation';

describe('Navigation action', () => {
  describe('getNavigation', () => {
    it('should create an action to get the navigation', () => {
      const url = 'http://127.0.0.1';
      const action = getNavigation(url);

      expect(action.type).toEqual(GET_NAVIGATION);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@navigation`);
    });

    it('should create an action to get the navigation with depth', () => {
      const url = 'http://127.0.0.1';
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

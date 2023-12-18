import { getContextNavigation } from './contextNavigation';
import { GET_CONTEXT_NAVIGATION } from '@plone/volto/constants/ActionTypes';

describe('ContextNavigation action', () => {
  describe('getContextNavigation', () => {
    it('should create an action to get the context navigation', () => {
      const url = 'http://localhost';
      const action = getContextNavigation(url);

      expect(action.type).toEqual(GET_CONTEXT_NAVIGATION);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@contextnavigation`);
    });

    it('should create an action to get the context navigation with options', () => {
      const base = 'http://localhost';
      const params = {
        name: 'Custom navigation',
        root_path: '/test/folder',
        includeTop: true,
        currentFolderOnly: false,
        topLevel: 10,
        bottomLevel: 99,
        no_icons: true,
        thumb_scale: 'mini',
        no_thumbs: true,
      };
      const action = getContextNavigation(base, params);
      const url = `${base}/@contextnavigation?expand.contextnavigation.bottomLevel=99&expand.contextnavigation.currentFolderOnly=false&expand.contextnavigation.includeTop=true&expand.contextnavigation.name=Custom navigation&expand.contextnavigation.no_icons=true&expand.contextnavigation.no_thumbs=true&expand.contextnavigation.root_path=/test/folder&expand.contextnavigation.thumb_scale=mini&expand.contextnavigation.topLevel=10`;

      expect(action.type).toEqual(GET_CONTEXT_NAVIGATION);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(url);
      expect(action.url).toEqual(url);
    });
  });
});

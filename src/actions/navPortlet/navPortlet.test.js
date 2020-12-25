import { getNavPortlet } from './navPortlet';
import { GET_NAVPORTLET } from '@plone/volto/constants/ActionTypes';

describe('NavPortlet action', () => {
  describe('getNavPortlet', () => {
    it('should create an action to get the navigation portlet', () => {
      const url = 'http://localhost';
      const action = getNavPortlet(url);

      expect(action.type).toEqual(GET_NAVPORTLET);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@navportlet`);
    });

    it('should create an action to get the navigation portlet with options', () => {
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
      const action = getNavPortlet(base, params);
      const url = `${base}/@navportlet?expand.navportlet.bottomLevel=99&expand.navportlet.currentFolderOnly=false&expand.navportlet.includeTop=true&expand.navportlet.name=Custom navigation&expand.navportlet.no_icons=true&expand.navportlet.no_thumbs=true&expand.navportlet.root_path=/test/folder&expand.navportlet.thumb_scale=mini&expand.navportlet.topLevel=10`;

      expect(action.type).toEqual(GET_NAVPORTLET);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(url);
      expect(action.url).toEqual(url);
    });
  });
});

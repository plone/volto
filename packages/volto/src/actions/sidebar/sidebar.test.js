import { setSidebarTab } from './sidebar';
import { SET_SIDEBAR_TAB } from '@plone/volto/constants/ActionTypes';

describe('Sidebar action', () => {
  describe('setSidebarTab', () => {
    it('should create an action to set the sidebar', () => {
      const index = 1;
      const action = setSidebarTab(index);

      expect(action.type).toEqual(SET_SIDEBAR_TAB);
      expect(action.index).toEqual(index);
    });
  });
});

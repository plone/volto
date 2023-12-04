import { setExpandedToolbar } from './toolbar';
import { EXPAND_TOOLBAR } from '@plone/volto/constants/ActionTypes';

describe('Toolbar action', () => {
  describe('setExpandedToolbar', () => {
    it('should create an action to set the toolbar expanded', () => {
      const isExpanded = false;
      const action = setExpandedToolbar(isExpanded);

      expect(action.type).toEqual(EXPAND_TOOLBAR);
      expect(action.isExpanded).toEqual(isExpanded);
    });
  });
});

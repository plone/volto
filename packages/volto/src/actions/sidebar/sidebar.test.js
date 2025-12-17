import {
  setMetadataFieldsets,
  setMetadataFocus,
  resetMetadataFocus,
  setSidebarTab,
} from './sidebar';
import {
  SET_METADATA_FIELDSETS,
  SET_METADATA_FOCUS,
  RESET_METADATA_FOCUS,
  SET_SIDEBAR_TAB,
} from '@plone/volto/constants/ActionTypes';

describe('Sidebar action', () => {
  describe('setMetadataFieldsets', () => {
    it('should create an action to set the metadata fieldsets', () => {
      const fieldsets = ['default'];
      const action = setMetadataFieldsets(fieldsets);

      expect(action.type).toEqual(SET_METADATA_FIELDSETS);
      expect(action.fieldsets).toEqual(fieldsets);
    });
  });

  describe('setMetadataFocus', () => {
    it('should create an action to set the metadata focus', () => {
      const fieldset = ['default'];
      const field = ['title'];
      const action = setMetadataFocus(fieldset, field);

      expect(action.type).toEqual(SET_METADATA_FOCUS);
      expect(action.fieldset).toEqual(fieldset);
      expect(action.field).toEqual(field);
    });
  });

  describe('resetMetadataFocus', () => {
    it('should create an action to reset the metadata focus', () => {
      const action = resetMetadataFocus();

      expect(action.type).toEqual(RESET_METADATA_FOCUS);
    });
  });

  describe('setSidebarTab', () => {
    it('should create an action to set the sidebar', () => {
      const index = 1;
      const action = setSidebarTab(index);

      expect(action.type).toEqual(SET_SIDEBAR_TAB);
      expect(action.index).toEqual(index);
    });
  });
});

import sidebar from './sidebar';
import {
  SET_METADATA_FIELDSETS,
  SET_METADATA_FOCUS,
  RESET_METADATA_FOCUS,
  SET_SIDEBAR_TAB,
} from '@plone/volto/constants/ActionTypes';

describe('Sidebar reducer', () => {
  it('should return the initial state', () => {
    expect(sidebar()).toEqual({
      metadataFieldFocus: '',
      metadataFieldsets: [],
      tab: 0,
    });
  });

  it('should handle SET_METADATA_FIELDSETS', () => {
    expect(
      sidebar(undefined, {
        type: SET_METADATA_FIELDSETS,
        fieldsets: ['default'],
      }),
    ).toEqual({
      metadataFieldFocus: '',
      metadataFieldsets: ['default'],
      tab: 0,
    });
  });

  it('should handle SET_METADATA_FOCUS', () => {
    expect(
      sidebar(undefined, {
        type: SET_METADATA_FOCUS,
        fieldset: 'default',
        field: 'title',
      }),
    ).toEqual({
      metadataFieldFocus: 'title',
      metadataFieldsets: ['default'],
      tab: 0,
    });
  });

  it('should handle RESET_METADATA_FOCUS', () => {
    expect(
      sidebar(
        { metadataFieldFocus: 'title' },
        {
          type: RESET_METADATA_FOCUS,
        },
      ),
    ).toEqual({
      metadataFieldFocus: '',
    });
  });

  it('should handle SET_SIDEBAR_TAB', () => {
    expect(
      sidebar(undefined, {
        type: SET_SIDEBAR_TAB,
        index: 1,
      }),
    ).toEqual({
      metadataFieldFocus: '',
      metadataFieldsets: [],
      tab: 1,
    });
  });
});

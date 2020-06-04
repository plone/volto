import sidebar from './sidebar';
import { SET_SIDEBAR_TAB } from '@plone/volto/constants/ActionTypes';

describe('Sidebar reducer', () => {
  it('should return the initial state', () => {
    expect(sidebar()).toEqual({
      tab: 0,
      blockData: null,
    });
  });

  it('should handle SET_SIDEBAR_TAB', () => {
    expect(
      sidebar(undefined, {
        type: SET_SIDEBAR_TAB,
        index: 1,
      }),
    ).toEqual({
      tab: 1,
      blockData: null,
    });
  });
});

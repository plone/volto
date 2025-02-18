import toolbar from './toolbar';
import { EXPAND_TOOLBAR } from '@plone/volto/constants/ActionTypes';

describe('Toolbar reducer', () => {
  it('should return the initial state', () => {
    expect(toolbar()).toEqual({
      expanded: false,
    });
  });

  it('should handle EXPAND_TOOLBAR', () => {
    expect(
      toolbar(undefined, {
        type: EXPAND_TOOLBAR,
        isExpanded: true,
      }),
    ).toEqual({
      expanded: true,
    });
  });
});

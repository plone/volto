import form from './form';
import { SET_FORM_DATA } from '@plone/volto/constants/ActionTypes';

describe('Form reducer', () => {
  it('should return the initial state', () => {
    expect(form()).toEqual({
      global: {},
      ui: {
        gridSelected: null,
        hovered: null,
        multiSelected: [],
        selected: null,
      },
    });
  });

  it('should handle SET_FORM_DATA', () => {
    expect(
      form(undefined, {
        type: SET_FORM_DATA,
        data: { foo: 'bar' },
      }),
    ).toEqual({
      global: { foo: 'bar' },
      ui: {
        gridSelected: null,
        hovered: null,
        multiSelected: [],
        selected: null,
      },
    });
  });
});

import controlpanel from './controlpanel';
import { GET_CONTROLPANEL } from '../../constants/ActionTypes';

describe('Controlpanel reducer', () => {
  it('should return the initial state', () => {
    expect(controlpanel()).toEqual({
      error: null,
      loaded: false,
      loading: false,
      controlpanel: null,
    });
  });

  it('should handle GET_CONTROLPANEL_PENDING', () => {
    expect(
      controlpanel(undefined, {
        type: `${GET_CONTROLPANEL}_PENDING`,
      }),
    ).toEqual({
      error: null,
      controlpanel: null,
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_CONTROLPANEL_SUCCESS', () => {
    expect(
      controlpanel(undefined, {
        type: `${GET_CONTROLPANEL}_SUCCESS`,
        result: 'My controlpanel',
      }),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
      controlpanel: 'My controlpanel',
    });
  });

  it('should handle GET_CONTROLPANEL_FAIL', () => {
    expect(
      controlpanel(undefined, {
        type: `${GET_CONTROLPANEL}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      loaded: false,
      loading: false,
      controlpanel: null,
    });
  });
});

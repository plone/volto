import controlpanels from './controlpanels';
import { GET_CONTROLPANELS } from '../../constants/ActionTypes';

describe('Controlpanels reducer', () => {
  it('should return the initial state', () => {
    expect(controlpanels()).toEqual({
      error: null,
      loaded: false,
      loading: false,
      controlpanels: [],
    });
  });

  it('should handle GET_CONTROLPANELS_PENDING', () => {
    expect(
      controlpanels(undefined, {
        type: `${GET_CONTROLPANELS}_PENDING`,
      }),
    ).toEqual({
      error: null,
      controlpanels: [],
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_CONTROLPANELS_SUCCESS', () => {
    expect(
      controlpanels(undefined, {
        type: `${GET_CONTROLPANELS}_SUCCESS`,
        result: 'My controlpanels',
      }),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
      controlpanels: 'My controlpanels',
    });
  });

  it('should handle GET_CONTROLPANELS_FAIL', () => {
    expect(
      controlpanels(undefined, {
        type: `${GET_CONTROLPANELS}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      loaded: false,
      loading: false,
      controlpanels: [],
    });
  });
});

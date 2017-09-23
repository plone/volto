import controlpanel from './controlpanel';
import {
  EDIT_CONTROLPANEL,
  GET_CONTROLPANEL,
} from '../../constants/ActionTypes';
import config from '../../config';

describe('Controlpanel reducer', () => {
  it('should return the initial state', () => {
    expect(controlpanel()).toEqual({
      edit: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      controlpanel: null,
    });
  });

  it('should handle GET_CONTROLPANEL_PENDING', () => {
    expect(
      controlpanel(undefined, {
        type: `${GET_CONTROLPANEL}_PENDING`,
      }),
    ).toEqual({
      edit: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loaded: false,
        loading: true,
        error: null,
      },
      controlpanel: null,
    });
  });

  it('should handle GET_CONTROLPANEL_SUCCESS', () => {
    expect(
      controlpanel(undefined, {
        type: `${GET_CONTROLPANEL}_SUCCESS`,
        result: {
          '@id': `${config.apiPath}/@controlpanels/mail`,
        },
      }),
    ).toEqual({
      edit: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loaded: true,
        loading: false,
        error: null,
      },
      controlpanel: {
        '@id': '/@controlpanels/mail',
      },
    });
  });

  it('should handle GET_CONTROLPANEL_FAIL', () => {
    expect(
      controlpanel(undefined, {
        type: `${GET_CONTROLPANEL}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      edit: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      controlpanel: null,
    });
  });

  it('should handle EDIT_CONTROLPANEL_PENDING', () => {
    expect(
      controlpanel(undefined, {
        type: `${EDIT_CONTROLPANEL}_PENDING`,
      }),
    ).toEqual({
      edit: {
        loaded: false,
        loading: true,
        error: null,
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      controlpanel: null,
    });
  });

  it('should handle EDIT_CONTROLPANEL_SUCCESS', () => {
    expect(
      controlpanel(undefined, {
        type: `${EDIT_CONTROLPANEL}_SUCCESS`,
      }),
    ).toEqual({
      edit: {
        loaded: true,
        loading: false,
        error: null,
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      controlpanel: null,
    });
  });

  it('should handle EDIT_CONTROLPANEL_FAIL', () => {
    expect(
      controlpanel(undefined, {
        type: `${EDIT_CONTROLPANEL}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      edit: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      controlpanel: null,
    });
  });
});

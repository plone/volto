import { settings } from '~/config';
import controlpanels from './controlpanels';
import {
  GET_CONTROLPANEL,
  LIST_CONTROLPANELS,
  UPDATE_CONTROLPANEL,
} from '@plone/volto/constants/ActionTypes';

describe('Controlpanels reducer', () => {
  it('should return the initial state', () => {
    expect(controlpanels()).toEqual({
      delete: {
        error: null,
        loaded: false,
        loading: false,
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      list: {
        loaded: false,
        loading: false,
        error: null,
      },
      post: {
        loaded: false,
        loading: false,
        error: null,
      },
      update: {
        loaded: false,
        loading: false,
        error: null,
      },
      controlpanel: null,
      controlpanels: [],
      systeminformation: null,
      databaseinformation: null,
    });
  });

  it('should handle GET_CONTROLPANEL_PENDING', () => {
    expect(
      controlpanels(undefined, {
        type: `${GET_CONTROLPANEL}_PENDING`,
      }),
    ).toMatchObject({
      get: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle GET_CONTROLPANEL_SUCCESS', () => {
    expect(
      controlpanels(undefined, {
        type: `${GET_CONTROLPANEL}_SUCCESS`,
        result: {
          '@id': `${settings.apiPath}/@controlpanels/mail`,
        },
      }),
    ).toMatchObject({
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
      controlpanels(undefined, {
        type: `${GET_CONTROLPANEL}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      get: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      controlpanel: null,
    });
  });

  it('should handle LIST_CONTROLPANELS_PENDING', () => {
    expect(
      controlpanels(undefined, {
        type: `${LIST_CONTROLPANELS}_PENDING`,
      }),
    ).toMatchObject({
      list: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle LIST_CONTROLPANELS_SUCCESS', () => {
    expect(
      controlpanels(undefined, {
        type: `${LIST_CONTROLPANELS}_SUCCESS`,
        result: 'result',
      }),
    ).toMatchObject({
      list: {
        loaded: true,
        loading: false,
        error: null,
      },
      controlpanels: 'result',
    });
  });

  it('should handle LIST_CONTROLPANELS_FAIL', () => {
    expect(
      controlpanels(undefined, {
        type: `${LIST_CONTROLPANELS}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      list: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      controlpanels: [],
    });
  });

  it('should handle UPDATE_CONTROLPANEL_PENDING', () => {
    expect(
      controlpanels(undefined, {
        type: `${UPDATE_CONTROLPANEL}_PENDING`,
      }),
    ).toMatchObject({
      update: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle UPDATE_CONTROLPANEL_SUCCESS', () => {
    expect(
      controlpanels(undefined, {
        type: `${UPDATE_CONTROLPANEL}_SUCCESS`,
      }),
    ).toMatchObject({
      update: {
        loaded: true,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle UPDATE_CONTROLPANEL_FAIL', () => {
    expect(
      controlpanels(undefined, {
        type: `${UPDATE_CONTROLPANEL}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      update: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
    });
  });
});

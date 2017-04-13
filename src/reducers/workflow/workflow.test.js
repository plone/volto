import workflow from './workflow';
import {
  GET_WORKFLOW_PENDING,
  GET_WORKFLOW_SUCCESS,
  GET_WORKFLOW_FAIL,
  TRANSITION_WORKFLOW_PENDING,
  TRANSITION_WORKFLOW_SUCCESS,
  TRANSITION_WORKFLOW_FAIL,
} from '../../constants/ActionTypes';

describe('Workflow reducer', () => {
  it('should return the initial state', () => {
    expect(workflow()).toEqual({
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      transition: {
        loaded: false,
        loading: false,
        error: null,
      },
      history: [],
      transitions: [],
    });
  });

  it('should handle GET_WORKFLOW_PENDING', () => {
    expect(
      workflow(undefined, {
        type: GET_WORKFLOW_PENDING,
      }),
    ).toEqual({
      get: {
        loaded: false,
        loading: true,
        error: null,
      },
      transition: {
        loaded: false,
        loading: false,
        error: null,
      },
      history: [],
      transitions: [],
    });
  });

  it('should handle GET_WORKFLOW_SUCCESS', () => {
    expect(
      workflow(undefined, {
        type: GET_WORKFLOW_SUCCESS,
        result: {
          history: 'history',
          transitions: 'transitions',
        },
      }),
    ).toEqual({
      get: {
        loaded: true,
        loading: false,
        error: null,
      },
      transition: {
        loaded: false,
        loading: false,
        error: null,
      },
      history: 'history',
      transitions: 'transitions',
    });
  });

  it('should handle GET_WORKFLOW_FAIL', () => {
    expect(
      workflow(undefined, {
        type: GET_WORKFLOW_FAIL,
        error: 'failed',
      }),
    ).toEqual({
      get: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      transition: {
        loaded: false,
        loading: false,
        error: null,
      },
      history: [],
      transitions: [],
    });
  });

  it('should handle TRANSITION_WORKFLOW_PENDING', () => {
    expect(
      workflow(undefined, {
        type: TRANSITION_WORKFLOW_PENDING,
      }),
    ).toEqual({
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      transition: {
        loaded: false,
        loading: true,
        error: null,
      },
      history: [],
      transitions: [],
    });
  });

  it('should handle TRANSITION_WORKFLOW_SUCCESS', () => {
    expect(
      workflow(undefined, {
        type: TRANSITION_WORKFLOW_SUCCESS,
        result: {},
      }),
    ).toEqual({
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      transition: {
        loaded: true,
        loading: false,
        error: null,
      },
      history: [],
      transitions: [],
    });
  });

  it('should handle TRANSITION_WORKFLOW_FAIL', () => {
    expect(
      workflow(undefined, {
        type: TRANSITION_WORKFLOW_FAIL,
        error: 'failed',
      }),
    ).toEqual({
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      transition: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      history: [],
      transitions: [],
    });
  });
});

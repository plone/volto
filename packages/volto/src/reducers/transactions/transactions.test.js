import transactions from './transactions';
import {
  GET_TRANSACTIONS,
  REVERT_TRANSACTIONS,
} from '../../constants/ActionTypes';

describe('Transactions reducer', () => {
  it('should return the initial state', () => {
    expect(transactions()).toEqual({
      transactions_recieved: [],
      get: {
        error: null,
        loaded: false,
        loading: false,
      },
      revert: {
        error: undefined,
        loaded: false,
        loading: false,
      },
    });
  });

  it('should handle GET_TRANSACTIONS_PENDING', () => {
    expect(
      transactions(undefined, {
        type: `${GET_TRANSACTIONS}_PENDING`,
      }),
    ).toEqual({
      transactions_recieved: [],
      get: {
        error: null,
        loaded: false,
        loading: true,
      },
      revert: {
        error: undefined,
        loaded: false,
        loading: false,
      },
    });
  });

  it('should handle GET_TRANSACTIONS_SUCCESS', () => {
    expect(
      transactions(undefined, {
        type: `${GET_TRANSACTIONS}_SUCCESS`,
        result: 'result',
      }),
    ).toEqual({
      transactions_recieved: 'result',
      get: {
        error: null,
        loaded: true,
        loading: false,
      },
      revert: {
        error: undefined,
        loaded: false,
        loading: false,
      },
    });
  });

  it('should handle GET_TRANSACTIONS_FAIL', () => {
    expect(
      transactions(undefined, {
        type: `${GET_TRANSACTIONS}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      transactions_recieved: [],
      get: {
        error: 'failed',
        loaded: false,
        loading: false,
      },
      revert: {
        error: undefined,
        loaded: false,
        loading: false,
      },
    });
  });

  it('should handle REVERT_TRANSACTIONS_PENDING', () => {
    expect(
      transactions(undefined, {
        type: `${REVERT_TRANSACTIONS}_PENDING`,
      }),
    ).toEqual({
      transactions_recieved: [],
      get: {
        error: null,
        loaded: false,
        loading: false,
      },
      revert: {
        error: undefined,
        loaded: false,
        loading: true,
      },
    });
  });

  it('should handle REVERT_TRANSACTIONS_SUCCESS', () => {
    expect(
      transactions(undefined, {
        type: `${REVERT_TRANSACTIONS}_SUCCESS`,
      }),
    ).toEqual({
      transactions_recieved: [],
      get: {
        error: null,
        loaded: false,
        loading: false,
      },
      revert: {
        error: null,
        loaded: true,
        loading: false,
      },
    });
  });

  it('should handle REVERT_TRANSACTIONS_FAIL', () => {
    expect(
      transactions(undefined, {
        type: `${REVERT_TRANSACTIONS}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      transactions_recieved: [],
      get: {
        error: null,
        loaded: false,
        loading: false,
      },
      revert: {
        error: 'failed',
        loaded: false,
        loading: false,
      },
    });
  });
});

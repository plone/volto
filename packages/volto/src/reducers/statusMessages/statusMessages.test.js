import statusMessages from './statusMessages';
import {
  ADD_STATUS_MESSAGES,
  CLEAR_STATUS_MESSAGES,
} from '@plone/volto/constants/ActionTypes';

describe('Status messages reducer', () => {
  it('has an initial state', () => {
    expect(statusMessages()).toEqual({ items: [] });
  });

  it('adds status messages', () => {
    const state = statusMessages(
      { items: [{ message: 'First', type: 'info' }] },
      {
        type: ADD_STATUS_MESSAGES,
        messages: [{ message: 'Second', type: 'warn' }],
      },
    );
    expect(state.items).toEqual([
      { message: 'First', type: 'info' },
      { message: 'Second', type: 'warn' },
    ]);
  });

  it('clears the status messages', () => {
    expect(
      statusMessages(
        { items: [{ message: 'First', type: 'info' }] },
        { type: CLEAR_STATUS_MESSAGES },
      ),
    ).toEqual({ items: [] });
  });
});

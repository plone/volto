import { addStatusMessages, clearStatusMessages } from './statusMessages';
import {
  ADD_STATUS_MESSAGES,
  CLEAR_STATUS_MESSAGES,
} from '@plone/volto/constants/ActionTypes';

describe('Status messages actions', () => {
  it('creates an action to add status messages', () => {
    const messages = [{ message: 'Saved', type: 'info' }];
    expect(addStatusMessages(messages)).toEqual({
      type: ADD_STATUS_MESSAGES,
      messages,
    });
  });

  it('creates an action to clear the status messages', () => {
    expect(clearStatusMessages()).toEqual({ type: CLEAR_STATUS_MESSAGES });
  });
});

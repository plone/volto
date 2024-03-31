import messages from './messages';
import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  PURGE_MESSAGES,
} from '@plone/volto/constants/ActionTypes';

describe('Messages reducer', () => {
  it('should return the initial state', () => {
    expect(messages()).toEqual({
      messages: [],
    });
  });

  it('should handle ADD_MESSAGE', () => {
    expect(
      messages(undefined, {
        type: ADD_MESSAGE,
        id: '1234',
        title: 'Title',
        body: 'Body',
        level: 'success',
      }),
    ).toEqual({
      messages: [
        {
          id: '1234',
          title: 'Title',
          body: 'Body',
          level: 'success',
        },
      ],
    });
  });

  it('should handle REMOVE_MESSAGE with index', () => {
    expect(
      messages(
        { messages: [0, 1] },
        {
          type: REMOVE_MESSAGE,
          index: 0,
        },
      ),
    ).toEqual({
      messages: [1],
    });
  });

  it('should handle REMOVE_MESSAGE at the end', () => {
    expect(
      messages(
        { messages: [0, 1] },
        {
          type: REMOVE_MESSAGE,
          index: -1,
        },
      ),
    ).toEqual({
      messages: [0],
    });
  });

  it('should handle PURGE_MESSAGES ready to dismiss on next purge', () => {
    expect(
      messages(
        { messages: [{ show: true }] },
        {
          type: PURGE_MESSAGES,
        },
      ),
    ).toEqual({
      messages: [{ show: false }],
    });
  });

  it('should handle PURGE_MESSAGES by effectively purging all ready to purge messages', () => {
    expect(
      messages(
        { messages: [{ show: false }] },
        {
          type: PURGE_MESSAGES,
        },
      ),
    ).toEqual({
      messages: [],
    });
  });
});

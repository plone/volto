import { addMessage, removeMessage, purgeMessages } from './messages';
import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  PURGE_MESSAGES,
} from '@plone/volto/constants/ActionTypes';

describe('Messages action', () => {
  describe('addMessage', () => {
    it('should create an action to add a message', () => {
      const title = 'Title';
      const body = 'Body';
      const level = 'success';
      const action = addMessage(title, body, level);

      expect(action.type).toEqual(ADD_MESSAGE);
      expect(action.title).toEqual(title);
      expect(action.body).toEqual(body);
      expect(action.level).toEqual(level);
    });
  });

  describe('removeMessage', () => {
    it('should create an action to remove a message', () => {
      const index = 0;
      const action = removeMessage(index);

      expect(action.type).toEqual(REMOVE_MESSAGE);
      expect(action.index).toEqual(0);
    });
  });

  describe('purgeMessages', () => {
    it('should create an action to purge the messages', () => {
      const action = purgeMessages();

      expect(action.type).toEqual(PURGE_MESSAGES);
    });
  });
});

import { copy, cut, copyContent, moveContent } from './clipboard';
import {
  COPY_CONTENT,
  MOVE_CONTENT,
  COPY,
  CUT,
} from '@plone/volto/constants/ActionTypes';

describe('Clipboard action', () => {
  describe('copyContent', () => {
    it('should create an action to copy content', () => {
      const source = ['http://source'];
      const target = 'http://target';
      const action = copyContent(source, target);

      expect(action.type).toEqual(COPY_CONTENT);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`${target}/@copy`);
      expect(action.request.data).toEqual({ source });
    });
  });

  describe('moveContent', () => {
    it('should create an action to move content', () => {
      const source = ['http://source'];
      const target = 'http://target';
      const action = moveContent(source, target);

      expect(action.type).toEqual(MOVE_CONTENT);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`${target}/@move`);
      expect(action.request.data).toEqual({ source });
    });
  });

  describe('copy', () => {
    it('should create an action to copy', () => {
      const source = ['http://source'];
      const action = copy(source);

      expect(action.type).toEqual(COPY);
      expect(action.source).toEqual(source);
    });
  });

  describe('cut', () => {
    it('should create an action to cut', () => {
      const source = ['http://source'];
      const action = cut(source);

      expect(action.type).toEqual(CUT);
      expect(action.source).toEqual(source);
    });
  });
});

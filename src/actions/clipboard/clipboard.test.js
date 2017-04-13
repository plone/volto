import { copy, cut, copyContent, moveContent } from './clipboard';
import {
  COPY_PENDING,
  COPY_SUCCESS,
  COPY_FAIL,
  MOVE_PENDING,
  MOVE_SUCCESS,
  MOVE_FAIL,
  COPY,
  CUT,
} from '../../constants/ActionTypes';

describe('Clipboard action', () => {
  describe('copyContent', () => {
    it('should create an action to copy content', () => {
      const source = 'http://source';
      const target = 'http://target';
      const action = copyContent(source, target);

      expect(action.types).toEqual([COPY_PENDING, COPY_SUCCESS, COPY_FAIL]);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith(`${target}/@copy`, {
        data: { source },
      });
    });
  });

  describe('moveContent', () => {
    it('should create an action to move content', () => {
      const source = 'http://source';
      const target = 'http://target';
      const action = moveContent(source, target);

      expect(action.types).toEqual([MOVE_PENDING, MOVE_SUCCESS, MOVE_FAIL]);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith(`${target}/@move`, {
        data: { source },
      });
    });
  });

  describe('copy', () => {
    it('should create an action to copy', () => {
      const source = 'http://source';
      const action = copy(source);

      expect(action.type).toEqual(COPY);
      expect(action.source).toEqual(source);
    });
  });

  describe('cut', () => {
    it('should create an action to cut', () => {
      const source = 'http://source';
      const action = cut(source);

      expect(action.type).toEqual(CUT);
      expect(action.source).toEqual(source);
    });
  });
});

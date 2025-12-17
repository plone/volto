import { createWorkingCopy } from './workingcopy';
import { CREATE_WORKING_COPY } from '@plone/volto/constants/ActionTypes';

describe('Working copy actions', () => {
  describe('createWorkingCopy', () => {
    it('should create an action for creating a working copy', () => {
      const path = '/foo/bar';
      const action = createWorkingCopy(path);

      expect(action.type).toEqual(CREATE_WORKING_COPY);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual('/foo/bar/@workingcopy');
    });
  });
});

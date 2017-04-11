import { getWorkflow, transitionWorkflow } from './workflow';
import {
  GET_WORKFLOW_PENDING, GET_WORKFLOW_SUCCESS, GET_WORKFLOW_FAIL,
  TRANSITION_WORKFLOW_PENDING, TRANSITION_WORKFLOW_SUCCESS, TRANSITION_WORKFLOW_FAIL,
} from '../../constants/ActionTypes';

describe('Workflow action', () => {
  describe('getWorkflow', () => {
    it('should create an action to get the workflow', () => {
      const url = 'http://localhost';
      const action = getWorkflow(url);

      expect(action.types).toEqual([GET_WORKFLOW_PENDING, GET_WORKFLOW_SUCCESS, GET_WORKFLOW_FAIL]);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`${url}/@workflow`);
    });
  });

  describe('transitionWorkflow', () => {
    it('should create an action to transition workflow', () => {
      const url = 'http://localhost';
      const action = transitionWorkflow(url);

      expect(action.types).toEqual([
        TRANSITION_WORKFLOW_PENDING, TRANSITION_WORKFLOW_SUCCESS, TRANSITION_WORKFLOW_FAIL]);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith(url);
    });
  });
});

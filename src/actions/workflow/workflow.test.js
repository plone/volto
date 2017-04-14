import { getWorkflow, transitionWorkflow } from './workflow';
import { GET_WORKFLOW, TRANSITION_WORKFLOW } from '../../constants/ActionTypes';

describe('Workflow action', () => {
  describe('getWorkflow', () => {
    it('should create an action to get the workflow', () => {
      const url = 'http://localhost';
      const action = getWorkflow(url);

      expect(action.type).toEqual(GET_WORKFLOW);

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

      expect(action.type).toEqual(TRANSITION_WORKFLOW);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith(url);
    });
  });
});

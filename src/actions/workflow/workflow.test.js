import { getWorkflow, transitionWorkflow } from './workflow';
import {
  GET_WORKFLOW,
  GET_WORKFLOW_MULTIPLE,
  TRANSITION_WORKFLOW,
} from '../../constants/ActionTypes';

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

    it('should create an action to get multiple workflows', () => {
      const urls = ['/blog', '/users'];
      const action = getWorkflow(urls);

      expect(action.type).toEqual(GET_WORKFLOW_MULTIPLE);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`${urls[0]}/@workflow`);
      expect(apiMock.get).toBeCalledWith(`${urls[1]}/@workflow`);
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

    it('should create an action to transition multiple workflow', () => {
      const urls = ['/blog', '/users'];
      const action = transitionWorkflow(urls);

      expect(action.type).toEqual(TRANSITION_WORKFLOW);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith(urls[0]);
      expect(apiMock.post).toBeCalledWith(urls[1]);
    });
  });
});

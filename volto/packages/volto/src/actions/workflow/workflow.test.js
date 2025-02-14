import { getWorkflow, transitionWorkflow } from './workflow';
import {
  GET_WORKFLOW,
  GET_WORKFLOW_MULTIPLE,
  TRANSITION_WORKFLOW,
} from '@plone/volto/constants/ActionTypes';

describe('Workflow action', () => {
  describe('getWorkflow', () => {
    it('should create an action to get the workflow', () => {
      const url = 'http://localhost';
      const action = getWorkflow(url);

      expect(action.type).toEqual(GET_WORKFLOW);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@workflow`);
    });

    it('should create an action to get multiple workflows', () => {
      const urls = ['/blog', '/users'];
      const action = getWorkflow(urls);

      expect(action.type).toEqual(GET_WORKFLOW_MULTIPLE);
      expect(action.request[0].op).toEqual('get');
      expect(action.request[0].path).toEqual(`${urls[0]}/@workflow`);
      expect(action.request[1].op).toEqual('get');
      expect(action.request[1].path).toEqual(`${urls[1]}/@workflow`);
    });
  });

  describe('transitionWorkflow', () => {
    it('should create an action to transition workflow', () => {
      const url = 'http://localhost';
      const action = transitionWorkflow(url);

      expect(action.type).toEqual(TRANSITION_WORKFLOW);
      expect(action.request.op).toEqual('post');
      expect(action.request.data.include_children).toEqual(false);
      expect(action.request.path).toEqual(url);
    });

    it('should create an action to transition multiple workflow', () => {
      const urls = ['/blog', '/users'];
      const action = transitionWorkflow(urls);

      expect(action.type).toEqual(TRANSITION_WORKFLOW);
      expect(action.request[0].op).toEqual('post');
      expect(action.request[0].path).toEqual(urls[0]);
      expect(action.request[1].op).toEqual('post');
      expect(action.request[1].path).toEqual(urls[1]);
    });
  });
});

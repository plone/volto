import { getFormToken } from './formToken';
import { GET_FORM_TOKEN } from '@plone/volto/constants/ActionTypes';

describe('Form token action', () => {
  describe('getFormToken', () => {
    it('should create an action to get a form token', () => {
      const action = getFormToken();

      expect(action.type).toEqual(GET_FORM_TOKEN);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual('/@form-token');
    });

    it('should get the form token of a content object', () => {
      const action = getFormToken('/news');

      expect(action.request.path).toEqual('/news/@form-token');
    });
  });
});

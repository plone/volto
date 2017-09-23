import { editControlpanel, getControlpanel } from './controlpanel';
import {
  EDIT_CONTROLPANEL,
  GET_CONTROLPANEL,
} from '../../constants/ActionTypes';

describe('Controlpanel action', () => {
  describe('getControlpanel', () => {
    it('should create an action to get the controlpanel', () => {
      const url = 'my-url';
      const action = getControlpanel(url);

      expect(action.type).toEqual(GET_CONTROLPANEL);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`/@controlpanels/${url}`);
    });
  });

  describe('editControlpanel', () => {
    it('should create an action to edit a controlpanel', () => {
      const url = 'http://localhost';
      const data = 'Hello World!';
      const action = editControlpanel(url, data);

      expect(action.type).toEqual(EDIT_CONTROLPANEL);

      const apiMock = {
        patch: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.patch).toBeCalledWith(url, { data });
    });
  });
});

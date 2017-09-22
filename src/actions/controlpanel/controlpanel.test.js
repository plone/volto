import getControlpanel from './controlpanel';
import { GET_CONTROLPANEL } from '../../constants/ActionTypes';

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

      expect(apiMock.get).toBeCalledWith(`/controlpanel/${url}`);
    });
  });
});

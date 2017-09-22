import getControlpanels from './controlpanels';
import { GET_CONTROLPANELS } from '../../constants/ActionTypes';

describe('Controlpanels action', () => {
  describe('getControlpanels', () => {
    it('should create an action to get the controlpanels', () => {
      const action = getControlpanels();

      expect(action.type).toEqual(GET_CONTROLPANELS);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith('/@controlpanels');
    });
  });
});

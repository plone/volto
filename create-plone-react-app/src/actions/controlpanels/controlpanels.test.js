import {
  getControlpanel,
  listControlpanels,
  updateControlpanel,
} from './controlpanels';
import {
  GET_CONTROLPANEL,
  LIST_CONTROLPANELS,
  UPDATE_CONTROLPANEL,
} from '../../constants/ActionTypes';

describe('Controlpanels action', () => {
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

  describe('listControlpanels', () => {
    it('should create an action to list the controlpanels', () => {
      const action = listControlpanels();

      expect(action.type).toEqual(LIST_CONTROLPANELS);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith('/@controlpanels');
    });
  });

  describe('updateControlpanel', () => {
    it('should create an action to update a controlpanel', () => {
      const url = 'http://localhost';
      const data = 'Hello World!';
      const action = updateControlpanel(url, data);

      expect(action.type).toEqual(UPDATE_CONTROLPANEL);

      const apiMock = {
        patch: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.patch).toBeCalledWith(url, { data });
    });
  });
});

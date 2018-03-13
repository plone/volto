import getTiles from './tiles';
import { GET_TILES } from '../../constants/ActionTypes';

describe('Tiles action', () => {
  describe('getTiles', () => {
    it('should create an action to get the tiles', () => {
      const action = getTiles();

      expect(action.type).toEqual(GET_TILES);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith('/@tiles');
    });
  });
});

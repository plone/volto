import getBreadcrumbs from './breadcrumbs';
import { GET_BREADCRUMBS } from '../../constants/ActionTypes';

describe('Breadcrumbs action', () => {
  describe('getBreadcrumbs', () => {
    it('should create an action to get the breadcrumbs', () => {
      const url = 'http://localhost';
      const action = getBreadcrumbs(url);

      expect(action.type).toEqual(GET_BREADCRUMBS);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`${url}/@breadcrumbs`);
    });
  });
});

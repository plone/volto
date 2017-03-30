import getBreadcrumbs from './breadcrumbs';
import {
  GET_BREADCRUMBS, GET_BREADCRUMBS_SUCCESS, GET_BREADCRUMBS_FAIL,
} from '../../constants/ActionTypes';

describe('Breadcrumbs action', () => {
  describe('getBreadcrumbs', () => {
    it('should create an action to get the breadcrumbs', () => {
      const url = 'http://localhost';
      const action = getBreadcrumbs(url);

      expect(action.types).toEqual([GET_BREADCRUMBS, GET_BREADCRUMBS_SUCCESS, GET_BREADCRUMBS_FAIL]);

      const apiMock = {
        get: jest.fn()
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`${url}/@components/breadcrumbs`);
    });
  });
})

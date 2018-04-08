import { listRoles } from './roles';
import { LIST_ROLES } from '../../constants/ActionTypes';

describe('Roles action', () => {
  describe('listRoles', () => {
    it('should create an action to get the breadcrumbs', () => {
      const action = listRoles();

      expect(action.type).toEqual(LIST_ROLES);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith('/@roles');
    });
  });
});

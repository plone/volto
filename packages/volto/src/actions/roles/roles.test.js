import { listRoles } from './roles';
import { LIST_ROLES } from '@plone/volto/constants/ActionTypes';

describe('Roles action', () => {
  describe('listRoles', () => {
    it('should create an action to get the breadcrumbs', () => {
      const action = listRoles();

      expect(action.type).toEqual(LIST_ROLES);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual('/@roles');
    });
  });
});

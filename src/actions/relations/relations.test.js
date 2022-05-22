import { listRelations } from './relations';
import { LIST_RELATIONS } from '@plone/volto/constants/ActionTypes';

describe('Users action', () => {
  describe('listUsers', () => {
    it('should create an action to get relations of type "relatedItems"', () => {
      const relation = 'relatedItems';
      const action = listRelations(relation);

      expect(action.type).toEqual(LIST_RELATIONS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `/@relations-catalog?relation=${relation}`,
      );
    });
  });
});

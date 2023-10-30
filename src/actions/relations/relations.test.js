import { queryRelations } from './relations';
import { LIST_RELATIONS } from '@plone/volto/constants/ActionTypes';

describe('Relations action', () => {
  describe('queryRelations', () => {
    it('should create an action to get relations of type "relatedItems"', () => {
      const relation = 'relatedItems';
      const action = queryRelations(relation);

      expect(action.type).toEqual(LIST_RELATIONS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`/@relations?relation=${relation}`);
    });
  });
});

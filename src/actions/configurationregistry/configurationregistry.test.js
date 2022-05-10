import { getRegistry } from './configurationregistry';
import { GET_CONFIGURATIONREGISTRY } from '@plone/volto/constants/ActionTypes';

describe('Configurationregistry action', () => {
  describe('getRegistry', () => {
    it('should create an action to get a configuration registry entry', () => {
      const action = getRegistry('plone.many_users');

      expect(action.type).toEqual(GET_CONFIGURATIONREGISTRY);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual('/@registry/plone.many_users');
    });
  });
});

import { addTranslation } from './translations';
import { ADD_TRANSLATION } from '@plone/volto/constants/ActionTypes';

describe('Translations action', () => {
  describe('addTranslation', () => {
    it('should create an action to add a translation', () => {
      const url = 'http://localhost/ca/la-meva-pagina';
      const action = addTranslation(url);

      expect(action.type).toEqual(ADD_TRANSLATION);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`${url}/@translations`);
    });
  });

  // describe('revertHistory', () => {
  //   it('should create an action to revert history', () => {
  //     const url = 'http://localhost';
  //     const version = 0;
  //     const action = revertHistory(url, version);

  //     expect(action.type).toEqual(REVERT_HISTORY);
  //     expect(action.request.op).toEqual('patch');
  //     expect(action.request.path).toEqual(`${url}/@history`);
  //     expect(action.request.data).toEqual({ version });
  //   });
  // });
});

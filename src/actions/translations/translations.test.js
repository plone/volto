import { getTranslationLocator } from './translations';
import { GET_TRANSLATION_LOCATOR } from '@plone/volto/constants/ActionTypes';

describe('Translations action', () => {
  describe('getTranslationLocator', () => {
    it('should create an action to add a translation', () => {
      const url = 'http://localhost/ca/la-meva-pagina';
      const lang = 'ca';
      const action = getTranslationLocator(url, lang);

      expect(action.type).toEqual(GET_TRANSLATION_LOCATOR);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `${url}/@translation-locator?targetLanguage=${lang}`,
      );
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

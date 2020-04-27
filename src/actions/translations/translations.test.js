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
        `${url}/@translation-locator?target_language=${lang}`,
      );
    });
  });
});

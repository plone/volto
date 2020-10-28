import {
  deleteLinkTranslation,
  getTranslationLocator,
  linkTranslation,
} from './translations';
import {
  DELETE_TRANSLATION,
  GET_TRANSLATION_LOCATOR,
  LINK_TRANSLATION,
} from '@plone/volto/constants/ActionTypes';

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
  describe('linkTranslation', () => {
    it('should create an action to link translations', () => {
      const url = 'http://localhost/de/my-page';
      const target = '1234123-123123-123123'; // Target as UUID
      const action = linkTranslation(url, target);

      expect(action.type).toEqual(LINK_TRANSLATION);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`${url}/@translations`);
      expect(action.request.data).toEqual({ id: target });
    });
  });
  describe('deleteLinkTranslation', () => {
    it('should create an action to delete link translations', () => {
      const url = 'http://localhost/de/my-page';
      const lang = 'es';
      const action = deleteLinkTranslation(url, lang);

      expect(action.type).toEqual(DELETE_TRANSLATION);
      expect(action.request.op).toEqual('del');
      expect(action.request.path).toEqual(`${url}/@translations`);
      expect(action.request.data).toEqual({ language: lang });
    });
  });
});

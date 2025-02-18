import langmap from './LanguageMap';

describe('Utils tests', () => {
  describe('langmap', () => {
    it('Language with simple code (ca)', () => {
      expect(langmap['ca'].nativeName).toStrictEqual('Català');
      expect(langmap['ca'].englishName).toStrictEqual('Catalan');
    });
    it('Language with extended code in the format ll-CC (pt-BR)', () => {
      expect(langmap['pt-BR'].nativeName).toStrictEqual('Português (Brasil)');
      expect(langmap['pt-BR'].englishName).toStrictEqual('Portuguese (Brazil)');
    });
    it('Language with extended code in the format ll_CC (pt_BR)', () => {
      expect(langmap['pt_BR'].nativeName).toStrictEqual('Português (Brasil)');
      expect(langmap['pt_BR'].englishName).toStrictEqual('Portuguese (Brazil)');
    });
    it('Language with extended code in the format ll-cc (pt-br)', () => {
      expect(langmap['pt-br'].nativeName).toStrictEqual('Português (Brasil)');
      expect(langmap['pt-br'].englishName).toStrictEqual('Portuguese (Brazil)');
    });
  });
});

import languages from '@plone/volto/constants/Languages.cjs';
import { toReactIntlLang } from '@plone/volto/helpers/Utils/Utils';
import {
  getSupportedLocales,
  negotiateLocale,
  resolveContentLocale,
} from './Locale';

const allLanguages = Object.keys(languages);

const codes = (supported: ArrayLike<{ code?: string }>) =>
  Array.from(supported, (l) => l.code);

describe('getSupportedLocales', () => {
  it('contains only the supported languages', () => {
    const supported = getSupportedLocales(['pt-br', 'de']);
    expect(codes(supported)).toEqual(['pt-br', 'de']);
  });

  it('falls back to English when it is supported', () => {
    const supported = getSupportedLocales(['ca', 'de', 'en']);
    expect(supported.default?.code).toBe('en');
  });

  it('falls back to the English entry as written in the setting', () => {
    const supported = getSupportedLocales(['de', 'EN']);
    expect(supported.default?.code).toBe('EN');
  });

  it('does not treat a regional English variant as English', () => {
    const supported = getSupportedLocales(['de', 'en-gb']);
    expect(supported.default?.code).toBe('de');
  });

  it('falls back to the first supported language when English is not supported', () => {
    expect(getSupportedLocales(['pt-br']).default?.code).toBe('pt-br');
    expect(getSupportedLocales(['eu', 'es']).default?.code).toBe('eu');
  });

  it('falls back to English when no language is supported', () => {
    const supported = getSupportedLocales([]);
    expect(codes(supported)).toEqual([]);
    expect(supported.default?.code).toBe('en');
  });

  it('falls back to English when the setting is missing', () => {
    const supported = getSupportedLocales(undefined);
    expect(codes(supported)).toEqual([]);
    expect(supported.default?.code).toBe('en');
  });

  it('ignores empty entries', () => {
    const supported = getSupportedLocales(['', 'pt-br']);
    expect(codes(supported)).toEqual(['pt-br']);
    expect(supported.default?.code).toBe('pt-br');
  });

  it('keeps English as the fallback for the default configuration', () => {
    const supported = getSupportedLocales(allLanguages);
    expect(codes(supported)).toEqual(allLanguages);
    expect(supported.default?.code).toBe('en');
  });
});

describe('negotiateLocale', () => {
  describe('on a monolingual pt-br site', () => {
    const supported = getSupportedLocales(['pt-br']);

    it.each([
      'en-US',
      'en',
      'de-DE,de;q=0.9',
      'es-ES,es;q=0.9,en;q=0.8',
      'fr',
      'ja',
      'zh-CN',
    ])('renders pt-BR when the browser sends %s', (header) => {
      expect(negotiateLocale(header, supported)).toBe('pt-BR');
    });

    it('renders pt-BR when the browser prefers pt-BR', () => {
      expect(negotiateLocale('pt-BR', supported)).toBe('pt-BR');
    });

    it('matches another Portuguese variant by language', () => {
      expect(negotiateLocale('pt-PT', supported)).toBe('pt-BR');
      expect(negotiateLocale('pt', supported)).toBe('pt-BR');
    });

    it('ignores an unsupported I18N_LANGUAGE cookie', () => {
      expect(negotiateLocale('en', supported)).toBe('pt-BR');
    });

    it('renders pt-BR for a content language token', () => {
      expect(negotiateLocale('pt-br', supported)).toBe('pt-BR');
    });
  });

  describe('on a multilingual site', () => {
    const supported = getSupportedLocales(['en', 'de', 'pt-br']);

    it.each([
      ['en-US', 'en'],
      ['de', 'de'],
      ['de-AT', 'de'],
      ['pt-BR', 'pt-BR'],
      ['pt_BR', 'pt-BR'],
      ['PT-br', 'pt-BR'],
    ])('maps %s to %s', (header, expected) => {
      expect(negotiateLocale(header, supported)).toBe(expected);
    });

    it('honours quality weights', () => {
      expect(negotiateLocale('en;q=0.5,de;q=0.9', supported)).toBe('de');
      expect(negotiateLocale('de;q=0.1,pt-BR', supported)).toBe('pt-BR');
    });

    it('skips unsupported languages until a supported one is found', () => {
      expect(negotiateLocale('fr-FR,fr;q=0.9,de;q=0.8', supported)).toBe('de');
    });

    it('falls back to English when nothing matches', () => {
      expect(negotiateLocale('fr-FR,fr;q=0.9', supported)).toBe('en');
    });

    it('prefers an exact region match over the first language match', () => {
      const regional = getSupportedLocales(['pt', 'pt-br']);
      expect(negotiateLocale('pt-BR', regional)).toBe('pt-BR');
      expect(negotiateLocale('pt', regional)).toBe('pt');
      expect(negotiateLocale('pt-PT', regional)).toBe('pt');
    });
  });

  describe('without a preference', () => {
    it.each([undefined, null, ''])(
      'returns the fallback for %s',
      (preference) => {
        expect(
          negotiateLocale(preference, getSupportedLocales(['pt-br'])),
        ).toBe('pt-BR');
        expect(
          negotiateLocale(preference, getSupportedLocales(['de', 'en'])),
        ).toBe('en');
      },
    );
  });

  describe('with malformed preferences', () => {
    const supported = getSupportedLocales(['pt-br']);

    it.each(['*', ';q=0.9', ',,,', '123', 'q=1'])(
      'returns the fallback for %j',
      (header) => {
        expect(negotiateLocale(header, supported)).toBe('pt-BR');
      },
    );
  });

  it.each(['pt-BR', '123', '*', ''])(
    'returns English for %j when no language is supported',
    (header) => {
      expect(negotiateLocale(header, getSupportedLocales([]))).toBe('en');
    },
  );

  it('does not let a fallback leak into the next negotiation', () => {
    const supported = getSupportedLocales(['en', 'de']);
    expect(negotiateLocale('fr', supported)).toBe('en');
    expect(negotiateLocale('de', supported)).toBe('de');
    expect(negotiateLocale('fr', supported)).toBe('en');
  });

  it('only returns locales whose catalog is loaded', () => {
    // server.jsx keys the loaded catalogs with toReactIntlLang().
    const supportedLanguages = ['pt-br', 'de'];
    const catalogs = supportedLanguages.map(toReactIntlLang);
    const supported = getSupportedLocales(supportedLanguages);
    for (const lang of allLanguages) {
      expect(catalogs).toContain(negotiateLocale(lang, supported));
    }
  });

  it('matches every language of the default configuration to itself', () => {
    const supported = getSupportedLocales(allLanguages);
    for (const lang of allLanguages) {
      expect(negotiateLocale(lang, supported)).toBe(toReactIntlLang(lang));
    }
  });

  it('keeps English as the fallback of the default configuration', () => {
    expect(negotiateLocale('sv-SE', getSupportedLocales(allLanguages))).toBe(
      'en',
    );
  });
});

describe('resolveContentLocale', () => {
  const supported = getSupportedLocales(['en', 'de', 'pt-br']);

  it('returns null when the current locale already matches the content', () => {
    expect(resolveContentLocale('de', 'de', supported)).toBeNull();
    expect(resolveContentLocale('pt-br', 'pt-BR', supported)).toBeNull();
  });

  it('compares locales regardless of format and case', () => {
    expect(resolveContentLocale('pt-br', 'pt_BR', supported)).toBeNull();
    expect(resolveContentLocale('pt_BR', 'pt-br', supported)).toBeNull();
    expect(resolveContentLocale('DE', 'de', supported)).toBeNull();
  });

  it('switches to the content language when the locale differs', () => {
    expect(resolveContentLocale('de', 'en', supported)).toBe('de');
    expect(resolveContentLocale('pt-br', 'de', supported)).toBe('pt-BR');
    expect(resolveContentLocale('en', 'pt-BR', supported)).toBe('en');
  });

  it('switches when the current locale is unsupported', () => {
    expect(resolveContentLocale('de', 'fr', supported)).toBe('de');
  });

  it('switches when there is no current locale', () => {
    expect(resolveContentLocale('de', undefined, supported)).toBe('de');
    expect(resolveContentLocale('de', null, supported)).toBe('de');
    expect(resolveContentLocale('de', '', supported)).toBe('de');
  });

  it('maps an unsupported content language to the fallback', () => {
    expect(resolveContentLocale('fr', 'de', supported)).toBe('en');
    expect(resolveContentLocale('fr', 'en', supported)).toBeNull();
  });

  it('maps a regional content language to its supported language', () => {
    expect(resolveContentLocale('de-at', 'en', supported)).toBe('de');
    expect(resolveContentLocale('de-at', 'de', supported)).toBeNull();
  });

  it('treats missing content language as the fallback', () => {
    expect(resolveContentLocale(undefined, 'de', supported)).toBe('en');
    expect(resolveContentLocale('', 'en', supported)).toBeNull();
  });

  it('accepts a raw Accept-Language value as the content language', () => {
    // server.jsx falls back to the header when nothing else is known.
    expect(resolveContentLocale('fr-FR,de;q=0.8', 'en', supported)).toBe('de');
    expect(resolveContentLocale('fr-FR,de;q=0.8', 'de', supported)).toBeNull();
  });

  it('only returns locales whose catalog is loaded', () => {
    const catalogs = ['en', 'de', 'pt-br'].map(toReactIntlLang);
    for (const lang of allLanguages) {
      const result = resolveContentLocale(lang, 'xx', supported);
      expect(catalogs).toContain(result);
    }
  });
});

describe('server-side rendering locale', () => {
  // Mirrors server.jsx: the request locale is negotiated first, then
  // corrected to the content language once the content is loaded.
  const render = (
    supportedLanguages: string[],
    preference: string | undefined,
    contentLang: string,
  ): string => {
    const supported = getSupportedLocales(supportedLanguages);
    const initial = negotiateLocale(preference, supported);
    return resolveContentLocale(contentLang, initial, supported) ?? initial;
  };

  it.each(['en-US', 'de-DE', 'es', 'fr-FR,fr;q=0.9', undefined])(
    'renders a monolingual pt-br site in pt-BR for %s (#8448)',
    (header) => {
      expect(render(['pt-br'], header, 'pt-br')).toBe('pt-BR');
    },
  );

  it('renders a German site in German for a French browser when English is also supported', () => {
    expect(render(['en', 'de'], 'fr-FR,fr;q=0.9', 'de')).toBe('de');
  });

  it('renders a German site in German for an English browser', () => {
    expect(render(['en', 'de'], 'en-US', 'de')).toBe('de');
  });

  it('renders each content item of a multilingual site in its language', () => {
    expect(render(['en', 'de', 'pt-br'], 'en-US', 'de')).toBe('de');
    expect(render(['en', 'de', 'pt-br'], 'de', 'pt-br')).toBe('pt-BR');
    expect(render(['en', 'de', 'pt-br'], 'pt-BR', 'en')).toBe('en');
  });

  it('follows the I18N_LANGUAGE cookie when the content has no language', () => {
    // Without a language token, server.jsx uses the cookie as contentLang.
    expect(render(['en', 'de'], 'de', 'de')).toBe('de');
  });

  it('renders content in an unsupported language with the fallback', () => {
    expect(render(['en', 'de'], 'de', 'fr')).toBe('en');
    expect(render(['pt-br'], 'en-US', 'fr')).toBe('pt-BR');
  });
});

import config from '@plone/volto/registry';

import {
  flattenToAppURL,
  flattenHTMLToAppURL,
  toPublicURL,
  getBaseUrl,
  getView,
  isCmsUi,
  isInternalURL,
  isUrl,
  normalizeUrl,
  removeProtocol,
} from './Url';

const { settings } = config;

describe('Url', () => {
  describe('getBaseUrl', () => {
    it('can remove a view name from an absolute url', () => {
      expect(getBaseUrl('http://localhost/edit')).toBe('http://localhost');
    });
    it('can remove a view name from a relative url', () => {
      expect(getBaseUrl('/contents')).toBe('');
    });
    it('can remove a view name from a relative url', () => {
      expect(getBaseUrl('/edit')).toBe('');
    });
    it('can remove a view name from a relative url', () => {
      expect(getBaseUrl('/register')).toBe('');
    });
    it('can remove a view name from a relative url', () => {
      expect(getBaseUrl('/password-reset')).toBe('');
    });
    it('can remove a view name from a relative url', () => {
      expect(getBaseUrl('/password-reset/token')).toBe('');
    });
    it('can remove a view name from a controlpanel url', () => {
      expect(getBaseUrl('/controlpanel/date-time')).toBe('');
    });
    it('it does not match inner parts, only last ones', () => {
      expect(getBaseUrl('/bla/doh/history/doh/bla')).toBe(
        '/bla/doh/history/doh/bla',
      );
    });
    it('it does not match inner parts, only last ones II', () => {
      expect(getBaseUrl('/bla/doh/sharing-my-test/doh/bla')).toBe(
        '/bla/doh/sharing-my-test/doh/bla',
      );
    });
    it('does nothing if no url is undefined', () => {
      expect(getBaseUrl(undefined)).toBe(undefined);
    });
    it('return empty string if no url is empty string', () => {
      expect(getBaseUrl('')).toBe('');
    });
  });

  describe('getView', () => {
    it('can get the edit view from the url', () => {
      expect(getView('http://localhost/edit')).toBe('edit');
    });

    it('can get the view view from the url', () => {
      expect(getView('http://localhost/my-blog')).toBe('view');
    });
  });

  describe('flattenToAppURL', () => {
    it('flattens a given URL to the app URL', () => {
      expect(flattenToAppURL(`${settings.apiPath}/edit`)).toBe('/edit');
    });

    it('does not fail if url is undefined', () => {
      expect(flattenToAppURL()).toBe(undefined);
    });

    it('flattens a given URL to the app URL, with settings.internalApiPath', () => {
      const url = 'http://plone:8080/Plone/something';
      const saved = settings.internalApiPath;
      settings.internalApiPath = 'http://plone:8080/Plone';
      expect(flattenToAppURL(url)).toBe('/something');
      settings.internalApiPath = saved;
    });
  });

  describe('toPublicURL', () => {
    it('returns public URL given the app URL', () => {
      const savedPublicURL = settings.publicURL;
      settings.publicURL = 'https://plone.org';
      expect(toPublicURL('/section/content')).toBe(
        'https://plone.org/section/content',
      );
      settings.publicURL = savedPublicURL;
    });

    it('returns public URL given the content @id while in dev mode', () => {
      const savedPublicURL = settings.publicURL;
      const savedApiPath = settings.apiPath;
      settings.publicURL = 'https://plone.org';
      settings.apiPath = 'http://localhost:3000/api';
      expect(toPublicURL('http://localhost:3000/api/section/content')).toBe(
        'https://plone.org/section/content',
      );
      settings.publicURL = savedPublicURL;
      settings.apiPath = savedApiPath;
    });

    it('returns public URL given the content @id while in dev mode', () => {
      const savedPublicURL = settings.publicURL;
      const savedApiPath = settings.apiPath;
      settings.publicURL = 'https://plone.org';
      settings.apiPath = 'https://plone.org/api';
      expect(toPublicURL('https://plone.org/api/section/content')).toBe(
        'https://plone.org/section/content',
      );
      settings.publicURL = savedPublicURL;
      settings.apiPath = savedApiPath;
    });
  });

  describe('isCmsUi', () => {
    [...settings.nonContentRoutes, '/controlpanel/mypanel'].forEach((route) => {
      if (typeof route === 'string') {
        it(`matches non-content-route ${route}`, () => {
          expect(isCmsUi(`/mycontent/${route}`)).toBe(true);
        });
      }
    });

    it('returns false on non-cms-ui views', () => {
      expect(isCmsUi('/mycontent')).toBe(false);
    });
  });

  describe('flattenHTMLToAppURL', () => {
    it('flattens all occurences of the api URL from an html snippet', () => {
      const html = `<a href="${settings.apiPath}/foo/bar">An internal link</a><a href="${settings.apiPath}/foo/baz">second link</a>`;
      expect(flattenHTMLToAppURL(html)).toBe(
        '<a href="/foo/bar">An internal link</a><a href="/foo/baz">second link</a>',
      );
    });

    it('flattens all occurences of the api URL from an html snippet, with settings.internalApiPath', () => {
      const html = `<a href="http://plone:8080/Plone/foo/bar">An internal link</a><a href="http://plone:8080/Plone/foo/baz">second link</a>`;
      const saved = settings.internalApiPath;
      settings.internalApiPath = 'http://plone:8080/Plone';
      expect(flattenHTMLToAppURL(html)).toBe(
        '<a href="/foo/bar">An internal link</a><a href="/foo/baz">second link</a>',
      );
      settings.internalApiPath = saved;
    });
  });
  describe('isInternalURL', () => {
    it('tells if an URL from API is internal or not', () => {
      const href = `${settings.apiPath}/foo/bar`;
      expect(isInternalURL(href)).toBe(true);
    });
    it('tells if an URL from APP is internal or not', () => {
      const href = `${settings.publicURL}`;
      expect(isInternalURL(href)).toBe(true);
    });
    it('tells if an URL from APP is internal or not 2', () => {
      const href = `${settings.publicURL}/foo/bar`;
      expect(isInternalURL(href)).toBe(true);
    });
    it('tells if an URL is internal or not, with settings.internalApiPath', () => {
      const href = `http://plone:8080/Plone/foo/bar`;
      const saved = settings.internalApiPath;
      settings.internalApiPath = 'http://plone:8080/Plone';
      expect(isInternalURL(href)).toBe(true);
      settings.internalApiPath = saved;
    });
    it('tells if an URL is external if settings.internalApiPath is empty', () => {
      const href = `http://google.com`;
      const saved = settings.internalApiPath;
      settings.internalApiPath = '';
      expect(isInternalURL(href)).toBe(false);
      settings.internalApiPath = saved;
    });
    it('tells if an URL is internal if it is an anchor', () => {
      const href = '#anchor';
      expect(isInternalURL(href)).toBe(true);
    });
    it('tells if an URL is internal if a root relative path', () => {
      const href = '/';
      expect(isInternalURL(href)).toBe(true);
    });
    it('tells if an URL is internal if a relative path', () => {
      const href = './../';
      expect(isInternalURL(href)).toBe(true);
    });
    it('Behave if URL is not a string', () => {
      const href = null;
      expect(isInternalURL(href)).toBe(null);
    });
    it('Behave if URL is not a string II', () => {
      const href = undefined;
      expect(isInternalURL(href)).toBe(undefined);
    });
  });
  describe('isUrl', () => {
    it('isUrl test', () => {
      const href = `www.example.com`;
      expect(isUrl(href)).toBe(true);
    });
    it('isUrl test 2', () => {
      const href = `www.example.com/foo/bar`;
      expect(isUrl(href)).toBe(true);
    });
    it('isUrl test 3', () => {
      const href = `https://www.example.com/foo/bar`;
      expect(isUrl(href)).toBe(true);
    });
    it('isUrl test 4', () => {
      const href = `https://www`;
      expect(isUrl(href)).toBe(false);
    });
    it('isUrl test 5', () => {
      const href = `www.e`;
      expect(isUrl(href)).toBe(false);
    });
  });
  describe('normalizeUrl', () => {
    it('normalizeUrl test', () => {
      const href = `www.example.com`;
      expect(normalizeUrl(href)).toBe('http://www.example.com');
    });
  });
  describe('removeProtocol', () => {
    it('removeProtocol test https', () => {
      const href = `https://www.example.com`;
      expect(removeProtocol(href)).toBe('www.example.com');
    });
    it('removeProtocol test http', () => {
      const href = `http://www.example.com`;
      expect(removeProtocol(href)).toBe('www.example.com');
    });
  });
});

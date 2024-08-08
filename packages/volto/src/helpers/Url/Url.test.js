import config from '@plone/volto/registry';

import {
  flattenToAppURL,
  flattenHTMLToAppURL,
  stripQuerystring,
  toPublicURL,
  getBaseUrl,
  getView,
  isCmsUi,
  isInternalURL,
  isUrl,
  getFieldURL,
  normalizeUrl,
  removeProtocol,
  addAppURL,
  expandToBackendURL,
  checkAndNormalizeUrl,
  normaliseMail,
  normalizeTelephone,
  flattenScales,
} from './Url';

beforeEach(() => {
  config.settings.legacyTraverse = false;
});

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
      expect(getBaseUrl('/passwordreset')).toBe('');
    });
    it('can remove a view name from a relative url', () => {
      expect(getBaseUrl('/passwordreset/token')).toBe('');
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
    it('return a null/undefined mailto address ', () => {
      expect(normaliseMail(null)).toBe('mailto:null');
      expect(normaliseMail(undefined)).toBe('mailto:undefined');
    });
    it('return a null/undefined telephone number', () => {
      expect(normalizeTelephone(null)).toBe('tel:null');
      expect(normalizeTelephone(undefined)).toBe('tel:undefined');
    });
    it('null returns an invalid link', () => {
      expect(checkAndNormalizeUrl(null).isValid).toBe(false);
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

  describe('stripQuerystring', () => {
    it('returns stripped URL given a URL with a querystring', () => {
      expect(stripQuerystring('/content?search=test')).toBe('/content');
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
    it('flattens all occurrences of the api URL from an html snippet', () => {
      const html = `<a href="${settings.apiPath}/foo/bar">An internal link</a><a href="${settings.apiPath}/foo/baz">second link</a>`;
      expect(flattenHTMLToAppURL(html)).toBe(
        '<a href="/foo/bar">An internal link</a><a href="/foo/baz">second link</a>',
      );
    });

    it('flattens all occurrences of the api URL from an html snippet, with settings.internalApiPath', () => {
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
    it('tells if an  URL is external if settings.externalroutes is present.', () => {
      const url = `https://localhost:3000/fb/my-page/contents`;
      const blacklistedurl = '/blacklisted';
      settings.externalRoutes = [
        { title: 'My Page', match: '/fb' },
        '/blacklisted',
      ];
      settings.publicURL = 'https://localhost:3000';
      expect(isInternalURL(url)).toBe(false);
      expect(isInternalURL(blacklistedurl)).toBe(false);
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
      expect(isUrl(href)).toBe(true);
    });
    it('isUrl test 5', () => {
      const href = `https://www/foo/bar`;
      expect(isUrl(href)).toBe(true);
    });
    it('isUrl test 6', () => {
      // at the end of the day, this is a strange, but valid, URL
      const href = `www.e`;
      expect(isUrl(href)).toBe(true);
    });
    it('isUrl test 7', () => {
      const href = `file://server/folder/file.txt`;
      expect(isUrl(href)).toBe(true);
    });
    it('isUrl test 8', () => {
      const href = `file://server.dir.internal/folder/file.txt`;
      expect(isUrl(href)).toBe(true);
    });
  });
  describe('getFieldURL', () => {
    it('returns app URL if the field is a string', () => {
      const field = `${settings.apiPath}/foo/bar`;
      expect(getFieldURL(field)).toBe('/foo/bar');
    });
    it('returns app URL if the field is an object with "@id"', () => {
      const field = { '@id': '/foo/bar' };
      expect(getFieldURL(field)).toBe('/foo/bar');
    });
    it('returns app URL if the field is an object with type URL', () => {
      const field = { '@type': 'URL', value: '/foo/bar' };
      expect(getFieldURL(field)).toBe('/foo/bar');
    });
    it('returns app URL if the field is an object with url or href properties', () => {
      const fieldUrl = { url: '/foo/bar' };
      const fieldHref = { href: '/foo/bar' };
      expect(getFieldURL(fieldUrl)).toBe('/foo/bar');
      expect(getFieldURL(fieldHref)).toBe('/foo/bar');
    });
    it('returns array of app URL if the field is an array of strings', () => {
      const field = [
        `${settings.apiPath}/foo/bar/1`,
        `${settings.apiPath}/foo/bar/2`,
      ];
      expect(getFieldURL(field)).toStrictEqual(['/foo/bar/1', '/foo/bar/2']);
    });
    it('returns array of app URL if the field is an array of objects', () => {
      const field = [
        {
          '@type': 'URL',
          value: `${settings.apiPath}/foo/bar/1`,
        },
        {
          '@type': 'URL',
          value: `${settings.apiPath}/foo/bar/2`,
        },
      ];
      expect(getFieldURL(field)).toStrictEqual(['/foo/bar/1', '/foo/bar/2']);
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
  describe('addAppURL', () => {
    it('addAppURL test https', () => {
      const href = `/ca/my-page`;
      expect(addAppURL(href)).toBe('http://localhost:8080/Plone/ca/my-page');
    });
  });
  describe('expandToBackendURL', () => {
    it('expandToBackendURL test with path', () => {
      const href = `/ca/my-page`;
      expect(expandToBackendURL(href)).toBe(
        'http://localhost:8080/Plone/++api++/ca/my-page',
      );
    });
    it('expandToBackendURL test full URL', () => {
      const href = `http://localhost:8080/Plone/ca/my-page`;
      expect(expandToBackendURL(href)).toBe(
        'http://localhost:8080/Plone/++api++/ca/my-page',
      );
    });
    it('expandToBackendURL test full URL - legacyTraverse true', () => {
      settings.apiPath = 'https://plone.org/api';
      settings.legacyTraverse = true;
      const href = `https://plone.org/api/ca/my-page`;
      expect(expandToBackendURL(href)).toBe('https://plone.org/api/ca/my-page');
    });
    it('expandToBackendURL test full URL - deployed seamless', () => {
      settings.apiPath = 'https://plone.org';
      const href = `https://plone.org/ca/my-page`;
      expect(expandToBackendURL(href)).toBe(
        'https://plone.org/++api++/ca/my-page',
      );
    });
  });

  describe('flattenScales', () => {
    it('flattenScales image is not set', () => {
      const id = '/halfdome2022-2.jpg';
      const image = undefined;
      expect(flattenScales(id, image)).toBe(undefined);
    });

    it('flattenScales test from the catalog', () => {
      const id = '/halfdome2022-2.jpg';
      const image = {
        'content-type': 'image/jpeg',
        download: '@@images/image-1182-cf763ae23c52340d8a17a7afdb26c8cb.jpeg',
        filename: 'halfdome2022.jpg',
        height: 665,
        scales: {
          great: {
            download:
              '@@images/image-1200-539ab119ebadc7d011798980a4a5e8d4.jpeg',
            height: 665,
            width: 1182,
          },
          huge: {
            download:
              '@@images/image-1600-188968febc677890c1b99d5339f9bef1.jpeg',
            height: 665,
            width: 1182,
          },
        },
        size: 319364,
        width: 1182,
      };
      expect(flattenScales(id, image)).toStrictEqual({
        'content-type': 'image/jpeg',
        download: '@@images/image-1182-cf763ae23c52340d8a17a7afdb26c8cb.jpeg',
        filename: 'halfdome2022.jpg',
        height: 665,
        scales: {
          great: {
            download:
              '@@images/image-1200-539ab119ebadc7d011798980a4a5e8d4.jpeg',
            height: 665,
            width: 1182,
          },
          huge: {
            download:
              '@@images/image-1600-188968febc677890c1b99d5339f9bef1.jpeg',
            height: 665,
            width: 1182,
          },
        },
        size: 319364,
        width: 1182,
      });
    });

    it('[preview_image_link] flattenScales test from the catalog', () => {
      const id = '/halfdome2022-2.jpg';
      const image = {
        base_path: '/broccoli.jpg',
        'content-type': 'image/jpeg',
        download: '@@images/image-1182-cf763ae23c52340d8a17a7afdb26c8cb.jpeg',
        filename: 'halfdome2022.jpg',
        height: 665,
        scales: {
          great: {
            download:
              '@@images/image-1200-539ab119ebadc7d011798980a4a5e8d4.jpeg',
            height: 665,
            width: 1182,
          },
          huge: {
            download:
              '@@images/image-1600-188968febc677890c1b99d5339f9bef1.jpeg',
            height: 665,
            width: 1182,
          },
        },
        size: 319364,
        width: 1182,
      };
      expect(flattenScales(id, image)).toStrictEqual({
        base_path: '/broccoli.jpg',
        'content-type': 'image/jpeg',
        download: '@@images/image-1182-cf763ae23c52340d8a17a7afdb26c8cb.jpeg',
        filename: 'halfdome2022.jpg',
        height: 665,
        scales: {
          great: {
            download:
              '@@images/image-1200-539ab119ebadc7d011798980a4a5e8d4.jpeg',
            height: 665,
            width: 1182,
          },
          huge: {
            download:
              '@@images/image-1600-188968febc677890c1b99d5339f9bef1.jpeg',
            height: 665,
            width: 1182,
          },
        },
        size: 319364,
        width: 1182,
      });
    });

    it('flattenScales test from serialization', () => {
      const id = 'http://localhost:3000/halfdome2022-2.jpg';
      const image = {
        'content-type': 'image/jpeg',
        download:
          'http://localhost:3000/halfdome2022-2.jpg/@@images/image-1182-cf763ae23c52340d8a17a7afdb26c8cb.jpeg',
        filename: 'halfdome2022.jpg',
        height: 665,
        scales: {
          great: {
            download:
              'http://localhost:3000/halfdome2022-2.jpg/@@images/image-1200-539ab119ebadc7d011798980a4a5e8d4.jpeg',
            height: 665,
            width: 1182,
          },
          huge: {
            download:
              'http://localhost:3000/halfdome2022-2.jpg/@@images/image-1600-188968febc677890c1b99d5339f9bef1.jpeg',
            height: 665,
            width: 1182,
          },
        },
        size: 319364,
        width: 1182,
      };
      expect(flattenScales(id, image)).toStrictEqual({
        'content-type': 'image/jpeg',
        download: '@@images/image-1182-cf763ae23c52340d8a17a7afdb26c8cb.jpeg',
        filename: 'halfdome2022.jpg',
        height: 665,
        scales: {
          great: {
            download:
              '@@images/image-1200-539ab119ebadc7d011798980a4a5e8d4.jpeg',
            height: 665,
            width: 1182,
          },
          huge: {
            download:
              '@@images/image-1600-188968febc677890c1b99d5339f9bef1.jpeg',
            height: 665,
            width: 1182,
          },
        },
        size: 319364,
        width: 1182,
      });
    });
  });
});

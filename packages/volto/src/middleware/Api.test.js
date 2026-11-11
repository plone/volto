import { createStore, applyMiddleware } from 'redux';

import apiMiddleware, { addExpandersToPath } from './api';
import { GET_CONTENT } from '@plone/volto/constants/ActionTypes';
import config from '@plone/volto/registry';

describe('api middleware helpers', () => {
  it('addExpandersToPath should work as expected', () => {
    config.settings.apiExpanders = [
      {
        match: '/',
        GET_CONTENT: ['mycustomexpander'],
      },
    ];

    const result = addExpandersToPath('/de/mypage', GET_CONTENT);
    expect(result).toEqual('/de/mypage?expand=mycustomexpander');
  });
  it('addExpandersToPath - Custom expander from settings, with expander (translation) already present (multilingual) in query', () => {
    config.settings.apiExpanders = [
      {
        match: '/',
        GET_CONTENT: ['mycustomexpander'],
      },
    ];

    const result = addExpandersToPath(
      '/de/mypage?expand=translations',
      GET_CONTENT,
      false,
      true,
    );
    expect(result).toEqual('/de/mypage?expand=translations,mycustomexpander');
  });
  it('addExpandersToPath - Path not matching', () => {
    config.settings.apiExpanders = [
      {
        match: '/de/otherpath',
        GET_CONTENT: ['mycustomexpander'],
      },
    ];

    const result = addExpandersToPath('/de/mypage', GET_CONTENT);
    expect(result).toEqual('/de/mypage');
  });
  it('addExpandersToPath - Path not matching, preserve query', () => {
    config.settings.apiExpanders = [
      {
        match: '/de/otherpath',
        GET_CONTENT: ['mycustomexpander'],
      },
    ];

    const result = addExpandersToPath(
      '/de/mypage/@navigation?expand.navigation.depth=3',
      GET_CONTENT,
    );
    expect(result).toEqual('/de/mypage/@navigation?expand.navigation.depth=3');
  });
  it('addExpandersToPath - Path matching, preserve query', () => {
    config.settings.apiExpanders = [
      {
        match: '/de/mypage',
        GET_CONTENT: ['mycustomexpander', 'mycustomexpander2'],
      },
    ];

    const result = addExpandersToPath(
      '/de/mypage/@navigation?expand.navigation.depth=3',
      GET_CONTENT,
    );
    expect(result).toEqual(
      '/de/mypage/@navigation?expand=mycustomexpander,mycustomexpander2&expand.navigation.depth=3',
    );
  });
  it('addExpandersToPath - Path matching, preserve query with multiple', () => {
    config.settings.apiExpanders = [
      {
        match: '/de/mypage',
        GET_CONTENT: ['mycustomexpander', 'mycustomexpander2'],
      },
    ];

    const result = addExpandersToPath(
      '/de/mypage/@navigation?expand.navigation.depth=3&expand.other=2',
      GET_CONTENT,
    );
    expect(result).toEqual(
      '/de/mypage/@navigation?expand=mycustomexpander,mycustomexpander2&expand.navigation.depth=3&expand.other=2',
    );
  });
  it('addExpandersToPath - Path not matching, preserve encoded query', () => {
    config.settings.apiExpanders = [
      {
        match: '/de/otherpath',
        GET_CONTENT: ['mycustomexpander'],
      },
    ];

    const result = addExpandersToPath('/de/mypage?query=a%26b', GET_CONTENT);
    expect(result).toEqual('/de/mypage?query=a%26b');
  });
  it('addExpandersToPath - Path matching, preserve encoded query', () => {
    config.settings.apiExpanders = [
      {
        match: '/de/mypage',
        GET_CONTENT: ['mycustomexpander'],
      },
    ];

    const result = addExpandersToPath('/de/mypage?query=a%26b', GET_CONTENT);
    expect(result).toEqual('/de/mypage?expand=mycustomexpander&query=a%26b');
  });
  it('addExpandersToPath - Two custom expanders from settings', () => {
    config.settings.apiExpanders = [
      {
        match: '/',
        GET_CONTENT: ['mycustomexpander', 'mycustomexpander2'],
      },
    ];

    const result = addExpandersToPath('/de/mypage', GET_CONTENT);
    // No need to stringify
    expect(result).toEqual(
      '/de/mypage?expand=mycustomexpander,mycustomexpander2',
    );
  });
  it('addExpandersToPath - Two custom expanders from settings, expansion nested (with dots notation) present', () => {
    config.settings.apiExpanders = [
      {
        match: '/',
        GET_CONTENT: ['mycustomexpander', 'mycustomexpander2'],
      },
    ];

    const result = addExpandersToPath(
      '/de/mypage/@navigation?expand.navigation.depth=3',
      GET_CONTENT,
    );
    // No need to stringify
    expect(result).toEqual(
      '/de/mypage/@navigation?expand=mycustomexpander,mycustomexpander2&expand.navigation.depth=3',
    );
  });
  it('addExpandersToPath - Two custom expanders from settings, query present ', () => {
    config.settings.apiExpanders = [
      {
        match: '/',
        GET_CONTENT: ['mycustomexpander', 'mycustomexpander2'],
      },
    ];

    const result = addExpandersToPath(
      '/de/mypage/@navigation?expand.navigation.depth=3&someotherquery=1',
      GET_CONTENT,
    );
    // No need to stringify
    expect(result).toEqual(
      '/de/mypage/@navigation?expand=mycustomexpander,mycustomexpander2&expand.navigation.depth=3&someotherquery=1',
    );
  });
  it('addExpandersToPath - Two custom expanders from settings, a list parameter present', () => {
    config.settings.apiExpanders = [
      {
        match: '/',
        GET_CONTENT: ['mycustomexpander', 'mycustomexpander2'],
      },
    ];

    const result = addExpandersToPath(
      '/de/mypage/@navigation?expand.navigation.depth=3&someotherquery=1&someotherquery=2',
      GET_CONTENT,
    );
    // No need to stringify
    expect(result).toEqual(
      '/de/mypage/@navigation?expand=mycustomexpander,mycustomexpander2&expand.navigation.depth=3&someotherquery=1&someotherquery=2',
    );
  });
  it('addExpandersToPath - Two custom expanders from settings, a list parameter present, and a translation expand already in query', () => {
    config.settings.apiExpanders = [
      {
        match: '/',
        GET_CONTENT: ['mycustomexpander', 'mycustomexpander2'],
      },
    ];

    const result = addExpandersToPath(
      '/de/mypage/@navigation?expand=translations&expand.navigation.depth=3&someotherquery=1&someotherquery=2',
      GET_CONTENT,
      false,
      true,
    );
    // No need to stringify
    expect(result).toEqual(
      '/de/mypage/@navigation?expand=translations,mycustomexpander,mycustomexpander2&expand.navigation.depth=3&someotherquery=1&someotherquery=2',
    );
  });
  it('addExpandersToPath - Two custom expanders from settings, a list parameter present, and a two expand present already in query', () => {
    config.settings.apiExpanders = [
      {
        match: '/',
        GET_CONTENT: ['mycustomexpander', 'mycustomexpander2'],
      },
    ];

    const result = addExpandersToPath(
      '/de/mypage/@navigation?expand=translations,secondexpand&expand.navigation.depth=3&someotherquery=1&someotherquery=2',
      GET_CONTENT,
    );
    // No need to stringify
    expect(result).toEqual(
      '/de/mypage/@navigation?expand=translations,secondexpand,mycustomexpander,mycustomexpander2&expand.navigation.depth=3&someotherquery=1&someotherquery=2',
    );
  });
  it('addExpandersToPath - navigation expander with querystring - no querystring from original request', () => {
    config.settings.apiExpanders = [
      {
        match: '/',
        GET_CONTENT: ['navigation'],
        querystring: {
          'expand.navigation.depth': 3,
        },
      },
    ];

    const result = addExpandersToPath('/de/mypage', GET_CONTENT);
    // No need to stringify
    expect(result).toEqual(
      '/de/mypage?expand=navigation&expand.navigation.depth=3',
    );
  });
  it('addExpandersToPath - navigation expander with several querystrings - no querystring from original request', () => {
    config.settings.apiExpanders = [
      {
        match: '/',
        GET_CONTENT: ['navigation'],
        querystring: {
          'expand.navigation.depth': 3,
          'expand.navigation.coolness': 1,
        },
      },
    ];

    const result = addExpandersToPath('/de/mypage', GET_CONTENT);
    // No need to stringify
    expect(result).toEqual(
      '/de/mypage?expand=navigation&expand.navigation.coolness=1&expand.navigation.depth=3',
    );
  });
  it('addExpandersToPath - navigation expander with querystring - querystring present from original request', () => {
    config.settings.apiExpanders = [
      {
        match: '/',
        GET_CONTENT: ['navigation'],
        querystring: {
          'expand.navigation.depth': 3,
        },
      },
    ];

    const result = addExpandersToPath(
      '/de/mypage?someotherquery=1&someotherquery=2',
      GET_CONTENT,
    );
    // No need to stringify
    expect(result).toEqual(
      '/de/mypage?expand=navigation&expand.navigation.depth=3&someotherquery=1&someotherquery=2',
    );
  });
  it('addExpandersToPath - navigation expander with several querystrings - querystring present from original request', () => {
    config.settings.apiExpanders = [
      {
        match: '/',
        GET_CONTENT: ['navigation'],
        querystring: {
          'expand.navigation.depth': 3,
          'expand.navigation.coolness': 1,
        },
      },
    ];

    const result = addExpandersToPath(
      '/de/mypage?someotherquery=1&someotherquery=2',
      GET_CONTENT,
    );
    // No need to stringify
    expect(result).toEqual(
      '/de/mypage?expand=navigation&expand.navigation.coolness=1&expand.navigation.depth=3&someotherquery=1&someotherquery=2',
    );
  });

  it('addExpandersToPath - inherit expander merged using querystring as a function', () => {
    config.settings.apiExpanders = [
      {
        match: '/',
        GET_CONTENT: ['navigation'],
        querystring: {
          'expand.navigation.depth': 3,
          'expand.navigation.coolness': 1,
        },
      },
      {
        match: '/',
        GET_CONTENT: ['inherit'],
        querystring: {
          'expand.inherit.behaviors':
            'voltolighttheme.header,voltolighttheme.theme,voltolighttheme.footer',
        },
      },
      {
        match: '/',
        GET_CONTENT: ['inherit'],
        querystring: (config, querystring) => {
          if (querystring['expand.inherit.behaviors']) {
            return {
              'expand.inherit.behaviors': querystring[
                'expand.inherit.behaviors'
              ].concat(',', 'plonegovbr.socialmedia.settings'),
            };
          } else {
            return {
              'expand.inherit.behaviors': 'plonegovbr.socialmedia.settings',
            };
          }
        },
      },
    ];

    const result = addExpandersToPath(
      '/de/mypage?someotherquery=1&someotherquery=2',
      GET_CONTENT,
    );

    expect(result).toEqual(
      '/de/mypage?expand=navigation,inherit&expand.inherit.behaviors=voltolighttheme.header,voltolighttheme.theme,voltolighttheme.footer,plonegovbr.socialmedia.settings&expand.navigation.coolness=1&expand.navigation.depth=3&someotherquery=1&someotherquery=2',
    );
  });
});

describe('api middleware - GET_CONTENT payload', () => {
  const initialState = {
    userSession: { token: null },
    content: { uploadedFiles: 0, get: { error: null } },
    site: { data: { features: { multilingual: true } } },
    apierror: { connectionRefused: false },
    intl: { locale: 'en' },
  };

  const runMiddleware = async (action, result) => {
    const actions = [];
    const record = () => (next) => (action) => {
      actions.push(action);
      return next(action);
    };
    const apiHelper = { get: () => Promise.resolve(result) };
    const store = createStore(
      (state = initialState) => state,
      applyMiddleware(apiMiddleware(apiHelper), record),
    );

    await store.dispatch(action);

    return actions[actions.length - 1];
  };

  it('dispatches _FAIL with a 404 when the payload is not a content object', async () => {
    // Plone answers browserviews and feeds with 200 plus HTML/XML, so the API
    // helper resolves with a string instead of a content object
    const last = await runMiddleware(
      { type: GET_CONTENT, request: { op: 'get', path: '/RSS' } },
      '<?xml version="1.0" encoding="utf-8" ?><rdf:RDF></rdf:RDF>',
    );

    expect(last.type).toEqual(`${GET_CONTENT}_FAIL`);
    expect(last.error).toEqual({ status: 404 });
    expect(last.result).toBeUndefined();
  });

  it('keeps the subrequest of the failed action', async () => {
    const last = await runMiddleware(
      {
        type: GET_CONTENT,
        subrequest: 'navigation',
        request: { op: 'get', path: '/en/@@search' },
      },
      '<!doctype html><html></html>',
    );

    expect(last.type).toEqual(`${GET_CONTENT}_FAIL`);
    expect(last.subrequest).toEqual('navigation');
  });

  it('lets a content object through untouched', async () => {
    const content = { '@id': '/en/about', '@components': { actions: {} } };
    const last = await runMiddleware(
      { type: GET_CONTENT, request: { op: 'get', path: '/en/about' } },
      content,
    );

    expect(last.type).toEqual(`${GET_CONTENT}_SUCCESS`);
    expect(last.result).toEqual(content);
  });
});

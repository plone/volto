import { addExpandersToPath } from './api';
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
});

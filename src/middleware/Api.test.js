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
  it('addExpandersToPath with expanders already present (multilingual)', () => {
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
  it('addExpandersToPath not matching', () => {
    config.settings.apiExpanders = [
      {
        match: '/de/otherpath',
        GET_CONTENT: ['mycustomexpander'],
      },
    ];

    const result = addExpandersToPath('/de/mypage', GET_CONTENT);
    expect(result).toEqual('/de/mypage');
  });
  it('addExpandersToPath not matching, preserve query', () => {
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
  it('addExpandersToPath should work as expected, several', () => {
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
  it('addExpandersToPath should work as expected, already query present', () => {
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
  it('addExpandersToPath should work as expected, already query present', () => {
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
});

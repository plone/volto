import { getContent } from './content';
import { GET_CONTENT } from '@plone/volto/constants/ActionTypes';

jest.mock('~/config', () => ({
  settings: {
    isMultilingual: true,
    supportedLanguages: ['de', 'es'],
  },
}));

describe('getContent', () => {
  it('[Multilingual] should create an action to get content', () => {
    const url = 'http://localhost';
    const action = getContent(url);

    expect(action.type).toEqual(GET_CONTENT);
    expect(action.request.op).toEqual('get');
    expect(action.request.path).toEqual(`${url}?expand=translations`);
  });
});

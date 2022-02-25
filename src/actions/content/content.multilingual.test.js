import { getContent } from './content';
import { GET_CONTENT } from '@plone/volto/constants/ActionTypes';
import config from '@plone/volto/registry';

config.settings.isMultilingual = true;
config.settings.supportedLanguages = ['de', 'es'];

describe('getContent', () => {
  it('[Multilingual] should create an action to get content', async () => {
    const getState = () => ({
      intl: {
        language: 'en',
      },
    });
    const dispatch = jest.fn(() =>
      Promise.resolve({ language: { token: 'de' } }),
    );
    const url = 'http://localhost';
    await getContent(url)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: GET_CONTENT,
      subrequest: null,
      request: {
        op: 'get',
        path: `${url}?expand=translations`,
      },
    });
  });
});

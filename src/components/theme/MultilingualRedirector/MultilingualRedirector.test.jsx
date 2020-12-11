import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import { ConfigContext } from '@plone/volto/components/theme/App/App';

import MultilingualRedirector from './MultilingualRedirector';

const mockStore = configureStore();

describe('MultilingualRedirector', () => {
  it('renders a MultilingualRedirector component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <ConfigContext.Provider
            value={{
              settings: {
                isMultilingual: true,
                supportedLanguages: ['de', 'es'],
              },
            }}
          >
            <MultilingualRedirector pathname={'/'} />
          </ConfigContext.Provider>
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

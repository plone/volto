import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';

import MultilingualRedirector from './MultilingualRedirector';

beforeAll(() => {
  config.settings.isMultilingual = true;
});

const mockStore = configureStore();

describe('MultilingualRedirector', () => {
  it('renders a MultilingualRedirector component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      site: {
        data: { 'plone.default_language': 'es' },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <MultilingualRedirector pathname={'/'} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

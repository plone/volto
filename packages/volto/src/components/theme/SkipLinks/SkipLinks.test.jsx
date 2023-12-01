import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import { PluggablesProvider } from '@plone/volto/components/manage/Pluggable';

import SkipLinks from './SkipLinks';

const mockStore = configureStore();

describe('SkipLinks', () => {
  it('renders skip links', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <PluggablesProvider>
          <MemoryRouter>
            <SkipLinks />
          </MemoryRouter>
        </PluggablesProvider>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

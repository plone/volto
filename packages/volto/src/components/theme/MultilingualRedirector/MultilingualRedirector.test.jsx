import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import MultilingualRedirector from './MultilingualRedirector';

const mockStore = configureStore();

describe('MultilingualRedirector', () => {
  it('renders a MultilingualRedirector component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      addons: {
        isMultilingual: true,
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

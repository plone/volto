import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import MultilingualRedirector from './MultilingualRedirector';

jest.mock('~/config', () => ({
  settings: {
    isMultilingual: true,
    supportedLanguages: ['de', 'ca'],
  },
}));

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
          <MultilingualRedirector pathname={'/'} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

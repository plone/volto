import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import ObjectBrowserWidget from './ObjectBrowserWidget';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore();

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

test('renders a objectBrowser widget component', () => {
  const store = mockStore({
    search: {},
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>
        <ObjectBrowserWidget
          id="my-field"
          title="My field"
          fieldSet="default"
          onChange={() => {}}
        />
      </MemoryRouter>
    </Provider>,
  );

  expect(container).toMatchSnapshot();
});

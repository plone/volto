import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter, Route } from 'react-router-dom';

import ContentTypeLayout from './ContentTypeLayout';

const mockStore = configureStore();

jest.mock('../Toolbar/Toolbar', () => jest.fn(() => <div id="Portal" />));

jest.mock('../Form/Form', () => jest.fn(() => <div id="form" />));

describe('ContentTypeLayout', () => {
  it('renders dexterity content-type layout component', () => {
    const store = mockStore({
      controlpanels: {
        controlpanel: {
          '@id':
            'http://localhost:8080/Plone/@controlpanels/dexterity-types/Document',
          title: 'Page',
          description: 'A document',
          data: {},
          schema: {},
        },
        update: {
          loaded: false,
          loading: false,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      schema: {
        schema: null,
      },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/controlpanel/dexterity-types/Document/layout']}
        >
          <Route
            path={'/controlpanel/dexterity-types/:id/layout'}
            component={ContentTypeLayout}
          />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});

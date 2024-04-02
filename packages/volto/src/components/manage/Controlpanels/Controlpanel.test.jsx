import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter, Route } from 'react-router-dom';

import Controlpanel from './Controlpanel';

const mockStore = configureStore();

jest.mock('../Toolbar/Toolbar', () => jest.fn(() => <div id="Portal" />));

jest.mock('../Form/Form', () => jest.fn(() => <div id="form" />));

describe('Controlpanel', () => {
  it('renders a controlpanel component', () => {
    const store = mockStore({
      controlpanels: {
        controlpanel: {
          '@id': 'http://localhost:8080/Plone/@controlpanels/date-and-time',
          title: 'Date and Time',
          schema: {
            fieldsets: [],
            properties: [],
          },
          data: {},
        },
        update: {
          loading: false,
          loaded: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/controlpanel/date-and-time']}>
          <Route path={'/controlpanel/:id'} component={Controlpanel} />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});

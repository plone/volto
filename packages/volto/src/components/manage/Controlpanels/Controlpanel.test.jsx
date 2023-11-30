import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter, Route } from 'react-router-dom';

import Controlpanel from './Controlpanel';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
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
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/controlpanel/date-and-time']}>
          <Route path={'/controlpanel/:id'} component={Controlpanel} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

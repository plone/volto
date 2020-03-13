import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter, Route } from 'react-router-dom';

import SiteControlpanel from './SiteControlpanel';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('../Form/Form', () => jest.fn(() => <div id="form" />));

describe('SiteControlpanel', () => {
  it('renders a site setup controlpanel component', () => {
    const store = mockStore({
      controlpanels: {
        controlpanel: {
          '@id': 'http://localhost:8080/Plone/@controlpanels/site',
          title: 'Website',
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
        <MemoryRouter initialEntries={['/controlpanel/site']}>
          <Route path={'/controlpanel/:id'} component={SiteControlpanel} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

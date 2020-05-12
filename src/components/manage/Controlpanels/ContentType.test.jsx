import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter, Route } from 'react-router-dom';

import ContentType from './ContentType';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('../Form/Form', () => jest.fn(() => <div id="form" />));

describe('ContentType', () => {
  it('renders dexterity content-type component', () => {
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
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/controlpanel/dexterity-types/Document']}
        >
          <Route
            path={'/controlpanel/dexterity-types/:id'}
            component={ContentType}
          />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

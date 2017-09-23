import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Controlpanel from './Controlpanel';

const mockStore = configureStore();

jest.mock('../Form/Form', () => jest.fn(() => <div id="form" />));

describe('Controlpanel', () => {
  it('renders a controlpanel component', () => {
    const store = mockStore({
      controlpanel: {
        controlpanel: {
          '@id': 'http://localhost:8080/Plone/@controlpanels/date-and-time',
          title: 'Date and Time',
          schema: {
            fieldsets: [],
            properties: [],
          },
          data: {},
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Controlpanel params={{ id: 'date-and-time' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Controlpanels from './Controlpanels';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));

describe('Controlpanels', () => {
  it('renders a controlpanels component', () => {
    const store = mockStore({
      controlpanels: {
        controlpanels: [
          {
            '@id': 'http://localhost:8080/Plone/@controlpanels/date-and-time',
            group: 'General',
            title: 'Date and Time',
          },
          {
            '@id': 'http://localhost:8080/Plone/@controlpanels/lang',
            group: 'General',
            title: 'Language',
          },
          {
            '@id': 'http://localhost:8080/Plone/@controlpanels/editing',
            group: 'Content',
            title: 'Editing',
          },
          {
            '@id': 'http://localhost:8080/Plone/@controlpanels/security',
            group: 'Security',
            title: 'Security',
          },
        ],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Controlpanels location={{ pathname: '/blog' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

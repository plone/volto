import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import DatabaseInformation from './DatabaseInformation';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('../../theme/Comments/CommentEditModal', () =>
  jest.fn(() => <div id="modal" />),
);

describe('DatabaseInformation', () => {
  it('renders a database information component', () => {
    const store = mockStore({
      controlpanels: {
        controlpanel: [
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
        <DatabaseInformation location={{ pathname: '/database' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

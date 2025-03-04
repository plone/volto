import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import ModerateComments from './ModerateComments';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('../../theme/Comments/CommentEditModal', () =>
  jest.fn(() => <div id="modal" />),
);

describe('ModerateComments', () => {
  it('renders a moderate comments component', () => {
    const store = mockStore({
      search: {
        items: [],
      },
      comments: {
        delete: {
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
        <ModerateComments location={{ pathname: '/blog' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

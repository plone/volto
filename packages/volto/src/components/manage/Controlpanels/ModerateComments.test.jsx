import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import ModerateComments from './ModerateComments';

const mockStore = configureStore();

jest.mock('@plone/volto/components/theme/Comments');
jest.mock('../Toolbar/Toolbar', () => jest.fn(() => <div id="Portal" />));

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
    const { container } = render(
      <Provider store={store}>
        <ModerateComments location={{ pathname: '/blog' }} />
        <div id="toolbar"></div>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});

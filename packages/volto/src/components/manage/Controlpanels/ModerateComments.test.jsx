import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import ModerateComments from './ModerateComments';

const mockStore = configureStore();

vi.mock('@plone/volto/components/theme/Comments');
vi.mock('../../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));

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
      actions: {
        actions: {},
      },
      userSession: {
        token: null,
      },
      content: {
        data: {},
        get: {
          loading: false,
          loaded: true,
        },
      },
      types: {
        types: [],
        get: {
          loading: false,
          loaded: true,
        },
      },
    });

    store.dispatch = vi.fn(() => Promise.resolve());

    const { container } = render(
      <Provider store={store}>
        <div>
          <ModerateComments location={{ pathname: '/blog' }} />
          <div id="toolbar"></div>
        </div>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});

import config from '@plone/volto/registry';
import React from 'react';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { __test__ as App } from './App';

beforeAll(() => {
  config.settings.navDepth = 1;
  config.views.errorViews = {
    ECONNREFUSED: () => <div className="ECONNREFUSED" />,
  };
});

const mockStore = configureStore();

jest.mock('../../manage/Toolbar/Toolbar', () =>
  jest.fn(() => <div id="toolbar" />),
);
jest.mock('../Header/Header', () => jest.fn(() => <div id="toolbar" />));
jest.mock('../Breadcrumbs/Breadcrumbs', () =>
  jest.fn(() => <div id="breadcrumbs" />),
);
jest.mock('../../manage/Messages/Messages', () =>
  jest.fn(() => <div id="messages" />),
);
jest.mock('../Navigation/Navigation', () =>
  jest.fn(() => <div id="navigation" />),
);
jest.mock('semantic-ui-react', () => ({
  Segment: jest.fn(() => <div id="segment" />),
  Container: jest.fn(() => <div id="container" />),
}));
jest.mock('../Footer/Footer', () => jest.fn(() => <div id="footer" />));

describe('App', () => {
  it('renders a app component', () => {
    const store = mockStore({
      userSession: {
        token: 'abcdefgh',
      },
      content: { data: { id: 'content', '@type': 'Document' } },
      apierror: {},
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/blog/edit']}>
          <App
            location={{ pathname: '/blog/edit' }}
            route={{
              routes: '',
            }}
          >
            <div />
          </App>
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
    component.unmount();
  });
});

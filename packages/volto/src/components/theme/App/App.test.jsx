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

vi.mock('../../manage/Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="toolbar" />),
}));
vi.mock('../Header/Header', () => ({
  default: vi.fn(() => <div id="header" />),
}));
vi.mock('../Breadcrumbs/Breadcrumbs', () => ({
  default: vi.fn(() => <div id="breadcrumbs" />),
}));
vi.mock('../../manage/Messages/Messages', () => ({
  default: vi.fn(() => <div id="messages" />),
}));
vi.mock('../Navigation/Navigation', () => ({
  default: vi.fn(() => <div id="navigation" />),
}));
vi.mock('semantic-ui-react', () => ({
  Segment: vi.fn(() => <div id="segment" />),
  Container: vi.fn(() => <div id="container" />),
}));
vi.mock('../Footer/Footer', () => ({
  default: vi.fn(() => <div id="footer" />),
}));

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

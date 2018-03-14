import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { AppComponent as App } from './App';

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
    const store = mockStore();
    const component = renderer.create(
      <Provider store={store}>
        <App location={{ pathname: '/blog/edit' }}>
          <div />
        </App>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

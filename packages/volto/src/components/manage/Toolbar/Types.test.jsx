import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import thunk from 'redux-thunk';

import Types from './Types';

const mockStore = configureStore([thunk]);

describe('Types', () => {
  it('renders an empty types component', () => {
    const store = mockStore({
      types: { types: [] },
      content: { data: {} },
      intl: {
        locale: 'en',
        messages: {},
      },
      userSession: {
        token: 'thetoken',
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Types pathname="/test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a types component', () => {
    const store = mockStore({
      types: { types: [{ title: 'Document' }] },
      content: { data: {} },
      intl: {
        locale: 'en',
        messages: {},
      },
      userSession: {
        token: 'thetoken',
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Types pathname="/test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an active types component', () => {
    const store = mockStore({
      types: { types: [{ title: 'Document' }] },
      content: { data: {} },
      intl: {
        locale: 'en',
        messages: {},
      },
      userSession: {
        token: 'thetoken',
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Types pathname="/test" active />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('types component if the user is anonymous', () => {
    const store = mockStore({
      types: { types: [{ title: 'Document' }] },
      content: { data: {} },
      intl: {
        locale: 'en',
        messages: {},
      },
      userSession: {
        token: '',
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Types pathname="/test" active />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

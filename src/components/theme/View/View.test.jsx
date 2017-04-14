import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import View from './View';

const mockStore = configureStore();

jest.mock('./SummaryView', () => jest.fn(() => <div id="SummaryView" />));
jest.mock('./TabularView', () => jest.fn(() => <div id="TabularView" />));
jest.mock('./DocumentView', () => jest.fn(() => <div id="DocumentView" />));

describe('View', () => {
  it('renders an empty view', () => {
    const store = mockStore({ content: {} });
    const component = renderer.create(
      <Provider store={store}>
        <View location={{ pathname: '/test' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a summary view', () => {
    const store = mockStore({ content: { data: { layout: 'summary_view' } } });
    const component = renderer.create(
      <Provider store={store}>
        <View location={{ pathname: '/test' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a tabular view', () => {
    const store = mockStore({ content: { data: { layout: 'tabular_view' } } });
    const component = renderer.create(
      <Provider store={store}>
        <View location={{ pathname: '/test' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a document view', () => {
    const store = mockStore({ content: { data: {} } });
    const component = renderer.create(
      <Provider store={store}>
        <View location={{ pathname: '/test' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

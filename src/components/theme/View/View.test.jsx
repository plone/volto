import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import View from './View';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));
jest.mock('./SummaryView', () => jest.fn(() => <div id="SummaryView" />));
jest.mock('./TabularView', () => jest.fn(() => <div id="TabularView" />));
jest.mock('./DocumentView', () => jest.fn(() => <div id="DocumentView" />));
jest.mock('../SocialSharing/SocialSharing', () =>
  jest.fn(() => <div id="SocialSharing" />),
);
jest.mock('../Comments/Comments', () => jest.fn(() => <div id="Comments" />));
jest.mock('../Tags/Tags', () => jest.fn(() => <div id="Tags" />));

describe('View', () => {
  it('renders an empty view', () => {
    const store = mockStore({
      content: {},
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <View location={{ pathname: '/test' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a summary view', () => {
    const store = mockStore({
      content: { data: { layout: 'summary_view' } },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <View location={{ pathname: '/test' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a tabular view', () => {
    const store = mockStore({
      content: { data: { layout: 'tabular_view' } },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <View location={{ pathname: '/test' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a document view', () => {
    const store = mockStore({
      content: { data: {} },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <View location={{ pathname: '/test' }} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

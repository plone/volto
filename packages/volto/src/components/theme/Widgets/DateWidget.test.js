import React from 'react';
import renderer from 'react-test-renderer';
import DateWidget from './DateWidget';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);
jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('DateWidget', () => {
  it('renders an empty date view widget component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <DateWidget />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a date view widget component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <DateWidget className="metadata" value="2020-08-18" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a date view widget component with L format', () => {
    const component = renderer.create(
      <Provider store={store}>
        <DateWidget className="metadata" value="2020-08-18" format="L" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a date view widget component with children', () => {
    const component = renderer.create(
      <Provider store={store}>
        <DateWidget className="metadata" value="2020-08-18">
          {(child) => <strong>{child}</strong>}
        </DateWidget>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

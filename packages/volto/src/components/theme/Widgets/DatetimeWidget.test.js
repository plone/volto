import React from 'react';
import renderer from 'react-test-renderer';
import DatetimeWidget from './DatetimeWidget';
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

describe('DatetimeWidget', () => {
  it('renders an empty date view widget component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <DatetimeWidget />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a date view widget component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <DatetimeWidget className="metadata" value="2020-08-04T09:00:00" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a date view widget component with LLLL format', () => {
    const component = renderer.create(
      <Provider store={store}>
        <DatetimeWidget
          className="metadata"
          value="2020-08-04T09:00:00"
          format="LLLL"
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a date view widget component with children', () => {
    const component = renderer.create(
      <Provider store={store}>
        <DatetimeWidget className="metadata" value="2020-08-04T09:00:00">
          {(child) => <strong>{child}</strong>}
        </DatetimeWidget>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

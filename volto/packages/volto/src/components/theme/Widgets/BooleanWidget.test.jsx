import React from 'react';
import renderer from 'react-test-renderer';
import BooleanWidget from './BooleanWidget';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('BooleanWidget', () => {
  it('renders an empty boolean view widget component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <BooleanWidget />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a boolean true view widget component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <BooleanWidget className="metadata" value={true} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a boolean false view widget component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <BooleanWidget className="metadata" value={false} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a boolean true view widget component with children', () => {
    const component = renderer.create(
      <Provider store={store}>
        <BooleanWidget className="metadata" value={true}>
          {(child) => <strong>{child}</strong>}
        </BooleanWidget>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a boolean false view widget component with children', () => {
    const component = renderer.create(
      <Provider store={store}>
        <BooleanWidget className="metadata" value={false}>
          {(child) => <strong>{child}</strong>}
        </BooleanWidget>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

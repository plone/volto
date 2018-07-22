import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Field from './Field';

const mockStore = configureStore();

jest.mock('../Widgets/ArrayWidget', () =>
  jest.fn(() => <div className="ArrayWidget" />),
);
jest.mock('../Widgets/CheckboxWidget', () =>
  jest.fn(() => <div className="CheckboxWidget" />),
);
jest.mock('../Widgets/PasswordWidget', () =>
  jest.fn(() => <div className="PasswordWidget" />),
);
jest.mock('../Widgets/SelectWidget', () =>
  jest.fn(() => <div className="SelectWidget" />),
);
jest.mock('../Widgets/TextWidget', () =>
  jest.fn(() => <div className="TextWidget" />),
);
jest.mock('../Widgets/TextareaWidget', () =>
  jest.fn(() => <div className="TextareaWidget" />),
);
jest.mock('../Widgets/DatetimeWidget', () =>
  jest.fn(() => <div className="DatetimeWidget" />),
);
jest.mock('../Widgets/WysiwygWidget', () =>
  jest.fn(() => <div className="WysiwygWidget" />),
);

describe('Field', () => {
  it('renders a field with a specific id', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Field id="schema" value={'{"fieldsets": [{"fields": []}]}'} />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a `richtext` named field', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Field widget="richtext" id="test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a `textarea` named field', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Field widget="textarea" id="test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a `datetime` named field', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Field widget="datetime" id="test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a `password` named field', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Field widget="password" id="test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a `text` named field', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Field widget="text" id="test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a select widget for a vocabulary-based field', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Field vocabulary="plone.app.vocabularies.Keywords" id="test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a select widget for a choices-based field', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Field choices={[]} id="test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a `boolean` type field', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Field type="boolean" id="test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an `array` type field', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Field type="array" id="test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a fallback field', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Field id="test" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

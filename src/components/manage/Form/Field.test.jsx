import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Field from './Field';

jest.mock('~/config', () => ({
  settings: {
    apiPath: 'http://localhost:8080/Plone',
  },
  widgets: {
    id: {
      schema: () => <div className="SchemaWidget" />,
      subjects: () => <div className="TokenWidget" />,
      query: () => <div className="QueryStringWidget" />,
    },
    widget: {
      richtext: () => <div className="WysiwygWidget" />,
      textarea: () => <div className="TextareaWidget" />,
      datetime: () => <div className="DatetimeWidget" />,
      password: () => <div className="PasswordWidget" />,
      file: () => <div className="FileWidget" />,
    },
    vocabulary: {
      'plone.app.vocabularies.Catalog': () => (
        <div className="ReferenceWidget" />
      ),
    },
    choices: () => <div className="SelectWidget" />,
    type: {
      boolean: () => <div className="CheckboxWidget" />,
      array: () => <div className="ArrayWidget" />,
      object: () => <div className="FileWidget" />,
      datetime: () => <div className="DatetimeWidget" />,
      password: () => <div className="PasswordWidget" />,
    },
    default: () => <div className="TextWidget" />,
  },
}));

const mockStore = configureStore();

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
        <Field
          id="schema"
          value={'{"fieldsets": [{"fields": []}]}'}
          onChange={() => {}}
        />
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
        <Field
          vocabulary={{ '@id': 'plone.app.vocabularies.Keywords' }}
          id="test"
        />
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

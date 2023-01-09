import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import config from '@plone/volto/registry';

import InlineForm from './InlineForm';

const mockStore = configureStore();

function NewBaseWidget(name) {
  return (props) => (
    <div id={`mocked-field-${props.id}`} className={`mocked-${name}-widget`}>
      {props.title || 'No title'} - {props.description || 'No description'} -
      {(typeof props.value === 'boolean'
        ? JSON.stringify(props.value)
        : props.value) || 'No value'}
    </div>
  );
}

const withStateManagement = (Component) => ({ ...props }) => {
  const [formData, onChangeFormData] = React.useState(props.formData || {});
  const onChangeField = (id, value) => {
    onChangeFormData({ ...formData, [id]: value });
  };

  return (
    <Component
      {...props}
      onChangeField={onChangeField}
      onChangeFormData={onChangeFormData}
      formData={formData}
    />
  );
};

beforeAll(() => {
  config.widgets.default = NewBaseWidget('default');
  config.widgets.type.boolean = NewBaseWidget('boolean');
  config.widgets.type.number = NewBaseWidget('number');
});

describe('Form', () => {
  it('renders a form component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const WrappedInlineForm = withStateManagement(InlineForm);

    const { container } = render(
      <Provider store={store}>
        <WrappedInlineForm
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: 'Default',
                fields: ['title'],
              },
            ],
            properties: {
              title: {
                title: 'The title',
              },
              title2: {
                title: 'The title 2',
              },
            },
            required: [],
          }}
          onSubmit={() => {}}
          onCancel={() => {}}
          formData={{}}
        />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('renders a form component with defaults in the schema - Default text field', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const WrappedInlineForm = withStateManagement(InlineForm);

    const { container } = render(
      <Provider store={store}>
        <WrappedInlineForm
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: 'Default',
                fields: ['title'],
              },
            ],
            properties: {
              title: {
                title: 'The title',
                default: 'This is the default',
              },
            },
            required: [],
          }}
          onSubmit={() => {}}
          onCancel={() => {}}
          formData={{}}
        />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders a form component with defaults in the schema - Checkboxes', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const WrappedInlineForm = withStateManagement(InlineForm);

    const { container } = render(
      <Provider store={store}>
        <WrappedInlineForm
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: 'Default',
                fields: [
                  'theCheckBox',
                  'theTruthyCheckBox',
                  'theFalsyCheckBox',
                ],
              },
            ],
            properties: {
              theCheckBox: {
                title: 'The checkbox',
                type: 'boolean',
              },
              theTruthyCheckBox: {
                title: 'The truthy checkbox',
                type: 'boolean',
                default: true,
              },
              theFalsyCheckBox: {
                title: 'The falsy checkbox',
                type: 'boolean',
                default: false,
              },
            },
            required: [],
          }}
          onSubmit={() => {}}
          onCancel={() => {}}
          formData={{}}
        />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('renders a form component with defaults in the schema - Number field', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const WrappedInlineForm = withStateManagement(InlineForm);

    const { container } = render(
      <Provider store={store}>
        <WrappedInlineForm
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: 'Default',
                fields: ['number', 'numberWithValue'],
              },
            ],
            properties: {
              number: {
                title: 'The number, default set',
                type: 'number',
                default: 5,
              },
              numberWithValue: {
                title: 'The number, default with a value',
                type: 'number',
                default: 5,
              },
            },
            required: [],
          }}
          onSubmit={() => {}}
          onCancel={() => {}}
          formData={{ numberWithValue: 10 }}
        />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});

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
      {props.title || 'No title'} - {props.description || 'No description'}
      {props.value}
    </div>
  );
}

beforeAll(() => {
  config.widgets.default = NewBaseWidget('default');
});

describe('Form', () => {
  it('renders a form component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    let formData = {};

    const { container } = render(
      <Provider store={store}>
        <InlineForm
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
          formData={formData}
          onChangeBlock={(block, data) => {
            formData = data;
          }}
        />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('renders a form component with defaults in the schema', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    let formData = {};

    const { container } = render(
      <Provider store={store}>
        <InlineForm
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
          onChangeBlock={(block, data) => {
            formData = data;
          }}
          formData={formData}
        />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});

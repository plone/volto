import React from 'react';
import BlockDataForm, { addVariationsFieldToSchema } from './BlockDataForm';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import config from '@plone/volto/registry';
import { Provider } from 'react-intl-redux';

const mockStore = configureStore();

beforeAll(() => {
  config.widgets = {
    id: {},
    widget: {},
    vocabulary: {},
    choices: (props) => (
      <div className="SelectWidget">{JSON.stringify(props.choices)}</div>
    ),
    type: {},
    default: () => <div className="TextWidget" />,
  };

  config.blocks.blocksConfig.testBlock = {
    id: 'testBlock',
    variations: {
      default: {
        label: 'Default',
      },
      extra: {
        label: 'Extra',
      },
    },
  };

  config.blocks.blocksConfig.testBlockVariationsList = {
    id: 'testBlockVariationsList',
    variations: [
      {
        id: 'default',
        label: 'Default',
      },
      {
        id: 'extra',
        label: 'Extra',
      },
    ],
  };
});

describe('BlockDataForm utils', () => {
  it('addVariationsFieldToSchema should add field to schema', () => {
    const testSchema = {
      fieldsets: [{ fields: [] }],
      properties: {},
    };
    const intl = { formatMessage: () => 'untitled' };
    const schema = addVariationsFieldToSchema({
      schema: testSchema,
      intl,
      variations: {},
    });
    expect(testSchema.fieldsets[0].fields).toStrictEqual(['variation']);
    expect(schema.fieldsets[0].fields).toStrictEqual(['variation']);
    expect(schema).toBe(testSchema);
  });

  it('addVariationsFieldToSchema should add only add once to schema', () => {
    const testSchema = {
      fieldsets: [{ fields: ['variation'] }],
      properties: {},
    };
    const intl = { formatMessage: () => 'untitled' };
    const schema = addVariationsFieldToSchema({
      schema: testSchema,
      intl,
      variations: {},
    });
    expect(testSchema.fieldsets[0].fields).toStrictEqual(['variation']);
    expect(schema.fieldsets[0].fields).toStrictEqual(['variation']);
    expect(schema).toBe(testSchema);
  });
});

describe('BlockDataForm', () => {
  it('should add variations to schema', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const testSchema = {
      fieldsets: [{ title: 'Default', id: 'default', fields: [] }],
      properties: {},
      required: [],
    };
    const formData = {
      '@type': 'testBlock',
    };
    const { container } = render(
      <Provider store={store}>
        <BlockDataForm formData={formData} schema={testSchema} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();

    // schema is cloned, not mutated in place
    expect(testSchema.fieldsets[0].fields).toStrictEqual([]);
  });

  it('can handle variations as a list', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const testSchema = {
      fieldsets: [{ title: 'Default', id: 'default', fields: [] }],
      properties: {},
      required: [],
    };
    const formData = {
      '@type': 'testBlockVariationsList',
    };
    const { container } = render(
      <Provider store={store}>
        <BlockDataForm formData={formData} schema={testSchema} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();

    // schema is cloned, not mutated in place
    expect(testSchema.fieldsets[0].fields).toStrictEqual([]);
  });
});

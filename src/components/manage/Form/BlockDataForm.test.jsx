import React from 'react';
import BlockDataForm from './BlockDataForm';
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

  config.blocks.blocksConfig = {
    ...config.blocks.blocksConfig,

    testBlockNoVariations: {
      id: 'testBlockNoVariations',
    },
    testBlock: {
      id: 'testBlock',
      // enableStyling: true,
      variations: [
        {
          id: 'default',
          title: 'Default',
          isDefault: true,
        },
        {
          id: 'extra',
          title: 'Extra',
        },
      ],
    },
    testBlockOneVariation: {
      id: 'testBlockOneVariation',
      variations: [
        {
          id: 'default',
          title: 'Default',
          isDefault: true,
        },
      ],
    },
  };
});

describe('BlockDataForm', () => {
  it('should does not add variations to schema when unneeded', () => {
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
      '@type': 'testBlockNoVariations',
    };
    const { container } = render(
      <Provider store={store}>
        <BlockDataForm
          formData={formData}
          schema={testSchema}
          onChangeField={(id, value) => {}}
        />
      </Provider>,
    );
    expect(container).toMatchSnapshot();

    // schema is cloned, not mutated in place
    expect(testSchema.fieldsets[0].fields).toStrictEqual([]);
  });

  it('should does not add variations when only one variation', () => {
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
      '@type': 'testBlockOneVariation',
    };
    const { container } = render(
      <Provider store={store}>
        <BlockDataForm
          formData={formData}
          schema={testSchema}
          onChangeField={(id, value) => {}}
        />
      </Provider>,
    );
    expect(container).toMatchSnapshot();

    // schema is cloned, not mutated in place
    expect(testSchema.fieldsets[0].fields).toStrictEqual([]);
  });

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
        <BlockDataForm
          formData={formData}
          schema={testSchema}
          onChangeField={(id, value) => {}}
        />
      </Provider>,
    );
    expect(container).toMatchSnapshot();

    // schema is cloned, not mutated in place
    expect(testSchema.fieldsets[0].fields).toStrictEqual([]);
  });

  it('should add styling field to schema', () => {
    config.blocks.blocksConfig.testBlock.enableStyling = true;
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
        <BlockDataForm
          formData={formData}
          schema={testSchema}
          onChangeField={(id, value) => {}}
        />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should allow variations to enhance styling schema', () => {
    config.blocks.blocksConfig.testBlock.enableStyling = true;
    let finalSchema; // the schema is cloned during enhancing; we need it for tests because the ObjectWidget is not rendered properly in the test
    config.blocks.blocksConfig.testBlock.variations[0].schemaEnhancer = ({
      schema,
    }) => {
      const stylesSchema = schema.properties.styles.schema;
      stylesSchema.properties.extraField = { title: 'Extra field' };
      stylesSchema.fieldsets[0].fields.push('extraField');
      finalSchema = schema;
      return schema;
    };

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
        <BlockDataForm
          formData={formData}
          schema={testSchema}
          onChangeField={(id, value) => {}}
        />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
    expect(
      finalSchema.properties.styles.schema.properties.extraField,
    ).toStrictEqual({ title: 'Extra field' });
    expect(
      finalSchema.properties.styles.schema.fieldsets[0].fields,
    ).toStrictEqual(['align', 'extraField']);
  });
});

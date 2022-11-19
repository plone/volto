import React from 'react';
import BlockDataForm from './BlockDataForm';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import config from '@plone/volto/registry';
import { Provider } from 'react-intl-redux';

const mockStore = configureStore();

const withStateManagement = (Component) => ({ ...props }) => {
  const [formData, onChangeFormData] = React.useState(props.formData || {});
  const onChangeField = (id, value) => {
    onChangeFormData({ ...formData, [id]: value });
  };

  // NOTE: onChangeBlock here is not "really" implemented

  return (
    <Component
      {...props}
      onChangeField={onChangeField}
      onChangeBlock={(block, data) => onChangeFormData(data)}
      formData={formData}
    />
  );
};

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
    const WrappedBlockDataForm = withStateManagement(BlockDataForm);
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
        <WrappedBlockDataForm
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
    const WrappedBlockDataForm = withStateManagement(BlockDataForm);
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
        <WrappedBlockDataForm
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
    const WrappedBlockDataForm = withStateManagement(BlockDataForm);
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
        <WrappedBlockDataForm
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
});

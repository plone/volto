import React from 'react';
import Settings from './Settings';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import config from '@plone/volto/registry';
import { Provider } from 'react-intl-redux';
import { BlockDataForm } from '@plone/volto/components/manage/Form';

vi.mock('@plone/volto/components/manage/Form');

const mockStore = configureStore();

const withStateManagement =
  (Component) =>
  ({ ...props }) => {
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
  };
});

describe('Settings', () => {
  it('renders block settings form without schema enhancers', () => {
    const WrappedSettings = withStateManagement(Settings);
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
    const data = {
      '@type': 'testBlock',
    };
    const { container } = render(
      <Provider store={store}>
        <WrappedSettings
          data={data}
          block="test"
          schema={testSchema}
          onChangeBlock={(block, value) => {}}
        />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('passes the block id to BlockDataForm', () => {
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
    render(
      <Provider store={store}>
        <Settings
          data={{ '@type': 'testBlock' }}
          block="test"
          schema={testSchema}
          onChangeBlock={() => {}}
        />
      </Provider>,
    );
    // Without it, BlockDataForm calls onChangeBlock(undefined, data) and the
    // block data gets stored under the key "undefined"
    expect(BlockDataForm.mock.lastCall[0].block).toBe('test');
  });
});

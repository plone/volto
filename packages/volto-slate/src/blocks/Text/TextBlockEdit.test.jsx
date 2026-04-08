import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import config from '@plone/volto/registry';
import TextBlockEdit from './TextBlockEdit';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

// Create a proper Redux store with initial state
const createMockStore = (initialState) => {
  const rootReducer = (state = initialState) => state;
  return createStore(rootReducer, initialState);
};

window.getSelection = () => null;

global.__SERVER__ = true;
global.__CLIENT__ = false;

beforeAll(() => {
  config.widgets = {
    id: {
      default: () => <div />,
    },
    type: {
      boolean: () => <div />,
    },
  };

  config.settings = {
    supportedLanguages: [],
    slate: {
      elements: {
        default: ({ attributes, children }) => (
          <p {...attributes}>{children}</p>
        ),
      },
      leafs: {},
      persistentHelpers: [],
      contextToolbarButtons: [],
      textblockExtensions: [],
      extensions: [],
      elementToolbarButtons: {},
    },
  };
  config.blocks.blocksConfig.slate = {
    id: 'slate',
    title: 'Slate',
    group: 'text',
    edit: TextBlockEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    blockHasValue: (data) => {
      return !!data.plaintext;
    },
  };
});

describe('TextBlockEdit', () => {
  it('renders w/o errors', async () => {
    const store = createMockStore({
      userSession: {
        token: null,
      },
      users: {
        user: {},
        get: {
          loading: false,
          loaded: false,
          error: null,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    mockAllIsIntersecting(true);

    const { asFragment } = render(
      <Provider store={store}>
        <IntlProvider locale="en" messages={{}}>
          <TextBlockEdit
            block="478923"
            blockNode={{ current: {} }}
            detached={false}
            index={2}
            onAddBlock={() => {}}
            onChangeBlock={() => {}}
            onDeleteBlock={() => {}}
            onFocusNextBlock={() => {}}
            onFocusPreviousBlock={() => {}}
            onInsertBlock={() => {}}
            onMutateBlock={() => {}}
            onSelectBlock={() => {}}
            properties={{}}
            setSlateBlockSelection={() => {}}
            data={{
              '@type': 'slate',
              plaintext: '',
              value: [
                {
                  type: 'p',
                  children: [{ text: '' }],
                },
              ],
            }}
            selected={true}
          />
        </IntlProvider>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

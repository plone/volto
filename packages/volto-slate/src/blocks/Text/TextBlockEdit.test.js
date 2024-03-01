import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render } from '@testing-library/react';
import config from '@plone/volto/registry';
import TextBlockEdit from './TextBlockEdit';
import { nanoid } from '@plone/volto-slate/utils';
import { v4 as uuid } from 'uuid';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

const mockStore = configureStore();

window.getSelection = () => null;

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle
global.__CLIENT__ = false; // eslint-disable-line no-underscore-dangle

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
    cloneData: (data) => {
      const replaceAllUidsWithNewOnes = (value) => {
        if (value?.children?.length > 0) {
          const newChildren = value.children.map((childrenData) => {
            if (childrenData?.data?.uid) {
              return {
                ...childrenData,
                data: { ...childrenData.data, uid: nanoid(5) },
              };
            }
            return childrenData;
          });
          return {
            ...value,
            children: newChildren,
          };
        }
        return value;
      };
      return [
        uuid(),
        {
          ...data,
          value: [
            ...(data?.value || []).map((value) =>
              replaceAllUidsWithNewOnes(value),
            ),
          ],
        },
      ];
    },
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
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    mockAllIsIntersecting(true);

    // TODO: also test for the initial contents: My first paragraph.
    const { asFragment } = render(
      <Provider store={store}>
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
                children: [{ text: '' /* My first paragraph. */ }],
              },
            ],
          }}
          selected={true}
        />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
  it('clone data gives another uid', async () => {
    // TODO: also test for the initial contents: My first paragraph.
    expect(1 === 0);
    console.log('3');
    console.log(
      config.blocks.blocksConfig.slate.cloneData([
        {
          type: 'p',
          children: [
            { text: '' /* My first paragraph. */, data: { uid: 'xf63f' } },
          ],
        },
      ]),
    );
  });
});

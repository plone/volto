import React from 'react';
import renderer from 'react-test-renderer';
import View from './TableBlockView';
import config from '@plone/volto/registry';

beforeAll(() => {
  config.settings = {
    slate: {
      elements: {
        default: ({ attributes, children }) => (
          <p {...attributes}>{children}</p>
        ),
        h2: ({ attributes, children }) => <h2 {...attributes}>{children}</h2>,
      },
      leafs: {},
    },
  };
});

test('renders a view table component', () => {
  const component = renderer.create(
    <View
      data={{
        table: {
          rows: [
            {
              key: 'a',
              cells: [
                {
                  type: 'data',
                  key: 'b',
                  value: [
                    {
                      type: 'h2',
                      children: [{ text: 'My header' }],
                    },
                  ],
                },
              ],
            },
          ],
          hideHeaders: false,
        },
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

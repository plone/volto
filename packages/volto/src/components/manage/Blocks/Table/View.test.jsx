import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

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
                  value: {
                    blocks: [
                      {
                        data: {},
                        depth: 0,
                        entityRanges: [],
                        inlineStyleRanges: [],
                        key: 'fgm98',
                        text: 'My header',
                        type: 'header-two',
                      },
                    ],
                    entityMap: {},
                  },
                },
              ],
            },
          ],
        },
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

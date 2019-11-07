import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

test('renders a view text component', () => {
  const component = renderer.create(
    <View
      data={{
        text: {
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
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

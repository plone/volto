import React from 'react';
import renderer from 'react-test-renderer';
import TabularView from './TabularView';

test('renders a tabular view component', () => {
  const component = renderer.create(
    <TabularView
      content={{
        title: 'Hello World!',
        description: 'Hi',
        items: [
          {
            title: 'My item',
            description: 'My item description',
            url: 'http://item',
          },
        ],
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

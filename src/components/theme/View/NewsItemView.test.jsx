import React from 'react';
import renderer from 'react-test-renderer';
import NewsItemView from './NewsItemView';

test('renders a news item view component', () => {
  const component = renderer.create(
    <NewsItemView
      content={{
        title: 'Hello World!',
        description: 'Hi',
        text: {
          data: '<p>Hello World!',
        },
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

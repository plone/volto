import React from 'react';
import renderer from 'react-test-renderer';
import SummaryView from './SummaryView';

test('renders a summary view component', () => {
  const component = renderer.create(
    <SummaryView
      content={{
        title: 'Hello World!',
        description: 'Hi',
        items: [{
          title: 'My item',
          description: 'My item description',
          url: 'http://item',
          '@type': 'Document',
        }],
      }}
    />
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

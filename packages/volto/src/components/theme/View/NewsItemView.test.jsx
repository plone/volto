import React from 'react';
import renderer from 'react-test-renderer';
import NewsItemView from './NewsItemView';
import config from '@plone/volto/registry';

const { settings } = config;

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

test('renders a news item view component without links to api', () => {
  const component = renderer.create(
    <NewsItemView
      content={{
        title: 'Hello World!',
        description: 'Hi',
        text: {
          data: `<p>Hello World!</p><p>This is an <a href="${settings.apiPath}/foo/bar">internal link</a> and a <a href="${settings.apiPath}/foo/baz">second link</a></p>`,
        },
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

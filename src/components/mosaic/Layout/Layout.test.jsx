import React from 'react';
import renderer from 'react-test-renderer';
import Layout from './Layout';

jest.mock('../Grid/Grid', () => jest.fn(() => <div />));

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

test('renders a layout component', () => {
  const component = renderer.create(
    <Layout
      layout={[
        [
          {
            width: 12,
            content: '<h1>Hello World!',
            url: 'http://item',
          },
        ],
      ]}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

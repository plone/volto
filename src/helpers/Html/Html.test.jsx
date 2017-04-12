import React from 'react';
import renderer from 'react-test-renderer';
import Html from './Html';

jest.mock(
  'react-helmet',
  () => ({
    rewind: () => ({
      base: {
        toComponent: () => '',
      },
      title: {
        toComponent: () => '',
      },
      meta: {
        toComponent: () => '',
      },
      link: {
        toComponent: () => '',
      },
      script: {
        toComponent: () => '',
      },
    }),
  }),
);

test('renders a html component', () => {
  const component = renderer.create(
    <Html
      assets={{
        styles: {
          main: 'style.css',
        },
        javascript: {
          main: 'main.js',
        },
      }}
      component={<div />}
      store={{
        getState: () => {},
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

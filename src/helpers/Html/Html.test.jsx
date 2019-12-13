import React from 'react';
import renderer from 'react-test-renderer';
import Html from './Html';

jest.mock('../Helmet/Helmet', () => ({
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
}));

jest.mock('../BodyClass/BodyClass', () => ({
  rewind: () => ['class1', 'class2'],
}));

describe('Html', () => {
  it('renders a html component', () => {
    const component = renderer.create(
      <Html
        assets={{
          client: {
            css: 'style.css',
            js: 'bundle.js',
          },
        }}
        markup="<div />"
        store={{
          getState: () => {},
        }}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

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

jest.mock('~/config', () => ({
  settings: {
    initialReducersBlacklist: ['navigation'],
  },
}));

describe('Html', () => {
  it('renders a html component', () => {
    const component = renderer.create(
      <Html
        extractor={{
          getLinkElements: () => [
            <link
              key={1}
              data-chunk="client"
              rel="preload"
              as="script"
              href="http://localhost:3001/static/js/runtime~client.js"
            />,
          ],
          getStyleElements: () => [],
          getScriptElements: () => [
            <script async src="bundle.js" key="bundle" />,
          ],
        }}
        markup="<div />"
        store={{
          getState: () => ({
            content: { '@id': 'http://dummy' },
            navigation: { '@id': 'dummy-navigation' },
          }),
        }}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

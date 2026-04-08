import React from 'react';
import renderer from 'react-test-renderer';
import config from '@plone/volto/registry';
import Html from './Html';

vi.mock('../Helmet/Helmet', () => ({
  default: {
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
      style: {
        toComponent: () => '',
      },
      htmlAttributes: {
        toComponent: () => ({
          lang: 'en',
        }),
      },
    }),
  },
}));

vi.mock('../BodyClass/BodyClass', () => ({
  default: {
    rewind: () => ['class1', 'class2'],
  },
}));

config.settings = {};
config.settings.initialReducersBlacklist = ['navigation'];

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
  it('renders a html component with apiPath present', () => {
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
        apiPath={'https://plone.org'}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

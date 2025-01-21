import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { create } from 'react-test-renderer';
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

config.settings = {
  initialReducersBlacklist: ['navigation'],
};

describe('Html', () => {
  it('renders a html component', () => {
    const component = create(
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
    expect(json).toMatchInlineSnapshot(`
      <html
        lang="en"
      >
        <head>
          <meta
            charSet="utf-8"
          />
          <script
            dangerouslySetInnerHTML={
              {
                "__html": "window.env = {};",
              }
            }
          />
          <link
            href="/favicon.ico"
            rel="icon"
            sizes="any"
          />
          <link
            href="/icon.svg"
            rel="icon"
            type="image/svg+xml"
          />
          <link
            href="/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/site.webmanifest"
            rel="manifest"
          />
          <meta
            content="Plone 6 - https://plone.org"
            name="generator"
          />
          <meta
            content="width=device-width, initial-scale=1"
            name="viewport"
          />
          <meta
            content="yes"
            name="mobile-web-app-capable"
          />
          <link
            as="script"
            crossOrigin="true"
            data-chunk="client"
            href="http://localhost:3001/static/js/runtime~client.js"
            rel="preload"
          />
        </head>
        <body
          className="class1 class2"
        >
          <div
            aria-label="Toolbar"
            id="toolbar"
            role="navigation"
          />
          <div
            dangerouslySetInnerHTML={
              {
                "__html": "<div />",
              }
            }
            id="main"
          />
          <div
            aria-label="Sidebar"
            id="sidebar"
            role="complementary"
          />
          <script
            charSet="UTF-8"
            dangerouslySetInnerHTML={
              {
                "__html": "window.__data={"content":{"@id":"http:\\u002F\\u002Fdummy"}};",
              }
            }
          />
          <script
            async={true}
            crossOrigin="true"
            src="bundle.js"
          />
        </body>
      </html>
    `);
  });

  it('renders a html component with apiPath present', () => {
    const component = create(
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
    expect(json).toMatchInlineSnapshot(`
      <html
        lang="en"
      >
        <head>
          <meta
            charSet="utf-8"
          />
          <script
            dangerouslySetInnerHTML={
              {
                "__html": "window.env = {"apiPath":"https:\\u002F\\u002Fplone.org"};",
              }
            }
          />
          <link
            href="/favicon.ico"
            rel="icon"
            sizes="any"
          />
          <link
            href="/icon.svg"
            rel="icon"
            type="image/svg+xml"
          />
          <link
            href="/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/site.webmanifest"
            rel="manifest"
          />
          <meta
            content="Plone 6 - https://plone.org"
            name="generator"
          />
          <meta
            content="width=device-width, initial-scale=1"
            name="viewport"
          />
          <meta
            content="yes"
            name="mobile-web-app-capable"
          />
          <link
            as="script"
            crossOrigin="true"
            data-chunk="client"
            href="http://localhost:3001/static/js/runtime~client.js"
            rel="preload"
          />
        </head>
        <body
          className="class1 class2"
        >
          <div
            aria-label="Toolbar"
            id="toolbar"
            role="navigation"
          />
          <div
            dangerouslySetInnerHTML={
              {
                "__html": "<div />",
              }
            }
            id="main"
          />
          <div
            aria-label="Sidebar"
            id="sidebar"
            role="complementary"
          />
          <script
            charSet="UTF-8"
            dangerouslySetInnerHTML={
              {
                "__html": "window.__data={"content":{"@id":"http:\\u002F\\u002Fdummy"}};",
              }
            }
          />
          <script
            async={true}
            crossOrigin="true"
            src="bundle.js"
          />
        </body>
      </html>
    `);
  });
});

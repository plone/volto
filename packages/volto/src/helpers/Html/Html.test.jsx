import React from 'react';
import renderer from 'react-test-renderer';
import config from '@plone/volto/registry';
import Html from './Html';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

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
    const store = mockStore({
      getState: () => {},
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <IntlProvider locale="en">
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
            intl={{
              formatMessage: (message) => message.defaultMessage || message.id,
            }}
          />
        </IntlProvider>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  it('renders a html component with apiPath present', () => {
    const store = mockStore({
      getState: () => {},
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <IntlProvider>
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
            intl={{
              formatMessage: (message) => message.defaultMessage || message.id,
            }}
          />
        </IntlProvider>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

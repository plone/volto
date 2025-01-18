import React from 'react';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import config from '@plone/volto/registry';

import { AlternateHrefLangs } from './AlternateHrefLangs';

const mockStore = configureStore();

describe('AlternateHrefLangs', () => {
  beforeEach(() => {});
  it('non multilingual site, renders nothing', () => {
    config.settings.isMultilingual = false;
    const content = {
      '@id': '/',
      '@components': {},
    };
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    // We need to force the component rendering
    // to fill the Helmet
    renderer.create(
      <Provider store={store}>
        <AlternateHrefLangs content={content} />
      </Provider>,
    );

    const helmetLinks = Helmet.peek().linkTags;
    expect(helmetLinks.length).toBe(0);
  });
  it('multilingual site, with some translations', () => {
    config.settings.isMultilingual = true;
    config.settings.supportedLanguages = ['en', 'es', 'eu'];

    const content = {
      '@components': {
        translations: {
          items: [
            { '@id': '/en', language: 'en' },
            { '@id': '/es', language: 'es' },
          ],
        },
      },
    };

    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    // We need to force the component rendering
    // to fill the Helmet
    renderer.create(
      <Provider store={store}>
        <>
          <AlternateHrefLangs content={content} />
        </>
      </Provider>,
    );
    const helmetLinks = Helmet.peek().linkTags;

    expect(helmetLinks.length).toBe(2);

    expect(helmetLinks).toContainEqual({
      rel: 'alternate',
      href: '/es',
      hreflang: 'es',
    });
    expect(helmetLinks).toContainEqual({
      rel: 'alternate',
      href: '/en',
      hreflang: 'en',
    });
  });
  it('multilingual site, with all available translations', () => {
    config.settings.isMultilingual = true;
    config.settings.supportedLanguages = ['en', 'es', 'eu'];
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const content = {
      '@components': {
        translations: {
          items: [
            { '@id': '/en', language: 'en' },
            { '@id': '/eu', language: 'eu' },
            { '@id': '/es', language: 'es' },
          ],
        },
      },
    };

    // We need to force the component rendering
    // to fill the Helmet
    renderer.create(
      <Provider store={store}>
        <AlternateHrefLangs content={content} />
      </Provider>,
    );

    const helmetLinks = Helmet.peek().linkTags;

    // We expect having 3 links
    expect(helmetLinks.length).toBe(3);

    expect(helmetLinks).toContainEqual({
      rel: 'alternate',
      href: '/eu',
      hreflang: 'eu',
    });
    expect(helmetLinks).toContainEqual({
      rel: 'alternate',
      href: '/es',
      hreflang: 'es',
    });
    expect(helmetLinks).toContainEqual({
      rel: 'alternate',
      href: '/en',
      hreflang: 'en',
    });
  });
});

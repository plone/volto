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
      '@id': '/en',
      language: { token: 'en', title: 'English' },
      '@components': {
        translations: {
          items: [{ '@id': '/es', language: 'es' }],
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
      hrefLang: 'es',
    });
    expect(helmetLinks).toContainEqual({
      rel: 'alternate',
      href: '/en',
      hrefLang: 'en',
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
      '@id': '/en',
      language: { token: 'en', title: 'English' },
      '@components': {
        translations: {
          items: [
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
      hrefLang: 'eu',
    });
    expect(helmetLinks).toContainEqual({
      rel: 'alternate',
      href: '/es',
      hrefLang: 'es',
    });
    expect(helmetLinks).toContainEqual({
      rel: 'alternate',
      href: '/en',
      hrefLang: 'en',
    });
  });

  it('multilingual site, with all available translations - with server URL', () => {
    config.settings.isMultilingual = true;
    config.settings.supportedLanguages = ['en', 'es', 'eu'];
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const content = {
      '@id': 'http://localhost:3000/en',
      language: { token: 'en', title: 'English' },
      '@components': {
        translations: {
          items: [
            { '@id': 'http://localhost:3000/eu', language: 'eu' },
            { '@id': 'http://localhost:3000/es', language: 'es' },
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
      hrefLang: 'eu',
    });
    expect(helmetLinks).toContainEqual({
      rel: 'alternate',
      href: '/es',
      hrefLang: 'es',
    });
    expect(helmetLinks).toContainEqual({
      rel: 'alternate',
      href: '/en',
      hrefLang: 'en',
    });
  });
});

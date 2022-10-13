import '@plone/volto/config'; // This is the bootstrap for the global config - client side
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import enMessages from '@root/../locales/en.json';

import '@root/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <IntlProvider messages={enMessages} locale="en" defaultLocale="en">
      <StaticRouter location="/">
        <Story />
      </StaticRouter>
    </IntlProvider>
  ),
];

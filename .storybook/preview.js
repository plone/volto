import React from 'react';
import { StaticRouter } from 'react-router-dom';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <StaticRouter location="/">
      <Story />
    </StaticRouter>
  ),
];

import './storybook-base.css';
import config from '@plone/registry';
import installSlots from '../config';

config.set('slots', {});
config.set('utilities', {});
installSlots(config);

export const parameters = {
  backgrounds: {
    default: 'light',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

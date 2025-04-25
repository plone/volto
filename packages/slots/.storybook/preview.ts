import './storybook-base.css';
import '@plone/components/dist/basic.css';
import '../styles/main.css';
import config from '@plone/registry';
import installSlots from '../index';
import installBlocks from '@plone/blocks';

config.set('slots', {});
config.set('utilities', {});
installSlots(config);
installBlocks(config);

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

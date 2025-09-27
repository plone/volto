import './storybook-base.css';
import '../../theming/styles/tailwind.css';
import config from '@plone/registry';
import installPlate from '../index';

installPlate(config);

export const parameters = {
  backgrounds: {
    default: 'light',
  },
  options: {
    storySort: {
      order: [
        'Introduction',
        'Styleguide',
        'Tailwind',
        'Basic',
        ['Forms', 'Quanta', '*'],
      ],
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

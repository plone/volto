import './storybook-base.css';
import '../../theming/styles/tailwind.css';
import config from '@plone/volto/registry';
import installPlate from '../index';
import installVoltoSlate from '@plone/volto-slate/editor';
import installVoltoSlateConfigLite from '../stories/liteSlateConfig';

installVoltoSlateConfigLite(installVoltoSlate(config));

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

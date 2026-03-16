import { create } from 'storybook/theming/create';
import logo from './Logo.svg';

export default create({
  base: 'light',
  brandTitle: 'Plone Seven StoryBook',
  brandUrl: 'https://plone-storybook.readthedocs.io/',
  brandImage: logo,
  brandTarget: '_self',
});

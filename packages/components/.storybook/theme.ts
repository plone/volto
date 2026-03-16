import { create } from 'storybook/theming/create';
import logo from './Logo.svg';

export default create({
  base: 'light',
  brandTitle: '@plone/components StoryBook',
  brandUrl: 'https://plone-components.readthedocs.io/',
  brandImage: logo,
  brandTarget: '_self',
});

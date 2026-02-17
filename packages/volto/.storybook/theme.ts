import { create } from '@storybook/theming/create';
import logo from './Logo.svg';

export default create({
  base: 'light',
  brandTitle: '@plone/volto StoryBook',
  brandUrl: 'https://docs.plone.org/storybook/',
  brandImage: logo,
  brandTarget: '_self',
});

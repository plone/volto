import { create } from 'storybook/theming/create';
import logo from './Logo.svg';

export default create({
  base: 'light',
  brandTitle: '@plone/cmsui StoryBook',
  brandUrl: 'https://plone-cmsui.readthedocs.io/',
  brandImage: logo,
  brandTarget: '_self',
});
